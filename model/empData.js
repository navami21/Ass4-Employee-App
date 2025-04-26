const mongoose=require('mongoose');

const empSchema=mongoose.Schema({
    emp_name:String,
    emp_designation:String,
    emp_location:String,
    emp_salary:Number
})
const empData=mongoose.model('empdetails',empSchema);
module.exports=empData;