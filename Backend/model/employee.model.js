const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
    FirstName:{type:String,required:true},
    LastName:{type:String,required:true},
    Email:{type:String,required:true,Unique:true},
    Department:{type:String,required:true,Unique:true},
    Salary:{type:Number,required:true}
},{
    versionKey:false
})

module.exports=mongoose.model("Employee",employeeSchema)