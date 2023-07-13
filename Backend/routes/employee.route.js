const express = require("express")
const employeeRouter = express.Router()
const employeeModel = require("../model/employee.model")

//add employees
employeeRouter.post("/add",async(req,res)=>{
    const payload = req.body
    try {
        const employee = new employeeModel(payload)
      await employee.save()
        res.status(200).send({"msg":"Employee has been added",employee}) 
    } catch (error) {
        res.status(401).send({"msg":error.message})
    }
})



//get all the emplooyes
employeeRouter.get('/', async (req, res) => {
    try {
      const page = +(req.query.page) || 1;
      const limit = +(req.query.limit) || 5;
      const startIndex = (page - 1) * limit;
      
      const employees = await employeeModel.find().skip(startIndex).limit(limit);
      const totalItems = await employeeModel.countDocuments();

    const totalPages = Math.ceil(totalItems / limit);

      res.status(200).send({employees ,pageNumber:page,totalPages} );
    } catch (error) {
      res.status(401).send({ "msg": error.message });
    }
  });

//filterbydepartment
employeeRouter.get('/filterbydep',async (req, res) => {
  try {
    const department = req.query.department||""
 
  const page = +(req.query.page) || 1;
  const limit = +(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
 
  let dep ={}
 if(department!==""){
    dep.Department = department
 }
 
  const employees = await employeeModel.find(dep).skip(startIndex).limit(endIndex)
  const totalItems = await employeeModel.countDocuments();

    const totalPages = Math.ceil(totalItems / limit);

      res.status(200).send({employees ,pageNumber:page,totalPages} );
} catch (error) {
    res.status(401).send({"msg":error.message})
}
});


//search by name
employeeRouter.get('/searchbyname',async (req, res) => {
  try {
    const searchquery = req.query.search || ""
  const page = +(req.query.page) || 1;
  const limit = +(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const searchname = {}
  if(searchquery!==""){
  searchname.FirstName = {$regex:searchquery,$options:"i"}
  }


  const employees = await employeeModel.find(searchname).skip(startIndex).limit(endIndex)
  const totalItems = await employeeModel.countDocuments();

    const totalPages = Math.ceil(totalItems / limit);

      res.status(200).send({employees ,pageNumber:page,totalPages} );
} catch (error) {
    res.status(401).send({"msg":error.message})
}
});



//sort by salary 

employeeRouter.get('/sortbysalary',async (req, res) => {
    try {
      
    const {salary} = req.query
    const page = +(req.query.page) || 1;
    const limit = +(req.query.limit) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let sort={}
    if(salary=="asc"){
     sort.Salary=1
    }else if (salary==="desc"){
     sort.Salary = -1
    }
  
    const employees = await employeeModel.find().sort(sort).skip(startIndex).limit(endIndex)
    const totalItems = await employeeModel.countDocuments();

    const totalPages = Math.ceil(totalItems / limit);

      res.status(200).send({employees ,pageNumber:page,totalPages} );
  } catch (error) {
      res.status(401).send({"msg":error.message})
      
  }
  });



  //edit employee data 
  employeeRouter.patch("/edit/:_id",async(req,res)=>{
    const {_id} = req.params
    try {
        const emplooyes = await employeeModel.findByIdAndUpdate({_id},req.body)
        res.status(200).send({"msg":"employee has been updated"})
    } catch (error) {
        res.status(401).send({"msg":error.message})
    }
})

//delete employee data 

employeeRouter.delete("/delete/:_id",async(req,res)=>{
    const {_id} = req.params
    try {
        const emplooyes = await employeeModel.findByIdAndDelete({_id})
        res.status(200).send({"msg":"employee has been deleted",emplooyes})
    } catch (error) {
        res.status(401).send({"msg":error.message})
    }
})









module.exports = employeeRouter