const express = require('express')
require("./dbConnection/dbConnection")
const Users = require('./models/users')
const ToDo  = require('./models/toDo')
const JWT = require('jsonwebtoken')
const JWT_SECRETE = 'hellothisissecretestringtogeneratetoken'
const app = express()
//const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const PORT = 5000

const logInToken = (req, res, next) =>{

    console.log("here is header: ", req.headers.authorization)

    const {authorization} = req.headers
    if(!authorization){
       return res.status(401).json({
            message: "you must login "
        })
    }
    try {
        const {userId} =   JWT.verify(authorization, JWT_SECRETE)
        req.user= userId
    next()
    } catch (error) {
        console.log('error' , error)
        return res.status(401).json({error:"your must be logged in"})
       
    }
    

}
app.use(express.json())

app.get('/test', logInToken , (req, res) => {
    res.json({
        userId: req.user
    })
})

app.post('/signup', async (req, res) => {

    try {
        console.log(req.body.name)

        const { name, email, password } = req.body
        // console.log(name , email , password)

        if (!name || !email || !password) {
            return res.status(422).json({
                message: " All the fields are required"
            })
        }
        const user = await Users.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "This email id is already taken, choose another one"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12)

        const newuser = await new Users({
            name: name,
            email: email,
            password: hashedPassword
        })

        newuser.save()
        res.status(201).json({ message: "signup sucessfully " })

    } catch (error) {
        console.log("error", error)
        res.status(500).json({ error: "internal server error" })
    }
})

app.post('/signin', async (req, res) => {

    try {


        const { name, email, password } = req.body
        if (!email || !password) {
            return res.status(422).json({
                message: " All the fields are required"
            })
        }
        const user = await Users.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "user with this email doesn't exist"
            })
        }
        const MatchPassword = await bcrypt.compare(password, user.password)
        if (MatchPassword) {
            token = JWT.sign({ userId: user._id }, JWT_SECRETE)
            return res.status(201).json({userToken: token})
        }
        else {
            return res.status(401).json({ error: "Email or password in correct" })
        }

    } catch (error) {
        console.log("error", error)
        res.status(500).json({ error: "internal server error" })
    }
})

app.post('/todo' , logInToken, async (req, res) =>{

    try {
        const data = await new ToDo({
            todo: req.body.todo,
            todoBy: req.user
        })
        data.save()
        res.status(201).json({message: data})
    } catch (error) {
        res.status(401).json({error: "internal server error"})
    }

 
})
app.get('/todolist' , logInToken , async(req, res) =>{
       const _id = req.user
       const todoList = await ToDo.find({todoBy : _id})
        
       if( todoList.length === 0){
        return   res.status(200).json({message: "nothing to do "})
       }
       console.log(todoList)
       return res.status(200).json({message: todoList})
       
})
app.delete('/remove/:id' , logInToken ,async( req, res)=>{
      const _id = req.params.id
      
      const removedTodo = await ToDo.findOneAndRemove({_id})
      res.status(200).json({message: removedTodo})
      
})

app.listen(PORT, () => {
    console.log("sever listening on ", PORT)
})