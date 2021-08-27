const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/TodoDB" , {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
.then( console.log("connection build"))
.catch(error =>{
    console.log("Error : " , error)
})