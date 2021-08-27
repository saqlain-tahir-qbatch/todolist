const mongoose = require('mongoose')
const {ObjectId}  = mongoose.Schema.Types
const ToDoScehma = mongoose.Schema({
     todo: {
         type: String, 
         required: true 
     },
     todoBy: {  
         type: ObjectId,
         ref: "Users"    // relationShip established ho raha ha

     }
})
const ToDo = new mongoose.model('ToDos'  , ToDoScehma)
module.exports = ToDo