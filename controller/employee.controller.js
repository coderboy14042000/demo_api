const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {validationResult}=require('express-validator/check');
const dotenv=require('dotenv');
dotenv.config();
const connection = require("../db/db.connection");
const helper=require('../helper/common.helper');

module.exports = {

    registration:async(req,res)=>{
        try{
            let email=req.body.email;

            const errors=validationResult(req);
            if(!errors.isEmpty()){
                helper.handleError(res,400,"Required inputs are invalid.",false,{error:errors.array()});
                return;
            }
            connection.query("select * from employee where email=?",[email],(err,result)=>{
                if(err){
                    helper.handleError(res, 500, err);
                }
                if(result.length){
                    helper.respondAsJSON(res,"Employee Is Already in use.",result,true,409);
                }else{
                    bcrypt.hash(req.body.password,10,(err,password)=>{
                        if(err){
                            helper.handleError(res, 500, err);
                        }else{
                            let employeeData = {
                                name: req.body.name,
                                email: req.body.email,
                                password:password,
                                contact_no: req.body.contact_no,
                                profile_image: req.body.profile_image,
                                department_id: req.body.department_id || 1,
                                is_status: req.body.is_status || "Active",
                            };
                            connection.query("insert into employee set ?", [employeeData], (err) => {
                                if (err){
                                    helper.handleError(res, 500, err);
                                }else{
                                    helper.respondAsJSON(res,"Employee Registration Successfully",employeeData,true,200);
                                }
                            });
                        }
                    });
                }
            });
        }catch(Error){                
            helper.handleError(res,"Catch Error",Error);
            return;
        }
    },

    login:async(req,res)=>{
        try{
            let email=req.body.email;
            let password=req.body.password;

            connection.query("select * from employee where email=?",[email],(err,result)=>{
                if(err){
                    helper.handleError(res, 500, err);
                }
                if(!result.length){
                    helper.respondAsJSON(res,"Email or Password is Incorrect.",'',false,401);
                }

                let isMatchPassword = bcrypt.compareSync(password,result[0]['password']);

                if(isMatchPassword){
                    //const token=jwt.sign({employee_id:result[0].employee_id},process.env.JWT_KEY,{ expiresIn: "1h" });
                    let token = jwt.sign({
                        employee_id:result[0].employee_id,
                        email: result[0].email,
                        contact_no:result[0].contact_no,
                        profile_image:result[0].profile_image,
                        department_id:result[0].department_id,
                    }, process.env.JWT_KEY,{ expiresIn: '2h' });

                    connection.query("update employee set token=? where email=?",[token,email],(err)=>{
                        if(err)throw err;
                        return res.status(200).send({msg: "Logged in!",token,employee: result[0],});
                    });
                }else{
                    helper.respondAsJSON(res,"Password is incorrect!",'',false,401);
                }
            });

        }catch(Error){
            helper.handleError(res,"Catch Error",Error);
            return;
        }
    },
    
    getAllEmployee:async (req, res) => {
        try{
            let page_no=req.body.page_no;
            let sort_by=req.query.sort_by;
            let skip;
            
            if(page_no<=1){
                skip=0;
            }else{
                skip=(page_no-1)*process.env.DOCSLIMIT;
            }

            var customsearch;
            if(req.body.name){
                customsearch={
                    name:req.body.name,
                }
            }
            if(req.body.contact_no){
                customsearch={
                    contact_no:req.body.contact_no,
                }
            }
            if(req.body.email){
                customsearch={
                    email:req.body.email,
                }
            }

            let query=`select * from employee where ? ORDER BY ${sort_by} LIMIT ${process.env.DOCSLIMIT} OFFSET ${skip}`;
            connection.query(query,[customsearch],(err, employeeRow) => {
                if (err){
                    // console.log(employeeRow)
                    helper.handleError(res, 500, err);
                }
                
                if(employeeRow.length){
                    helper.respondAsJSON(res,"Employee Fatch Successfully",employeeRow,true,200);
                }else{
                    helper.respondAsJSON(res,"404 Not Found.","Employee Not Found.",false,404);
                }
            });
        }catch(Error){
            helper.handleError(res,"Catch Error",Error);
            return;
        }
    },

    getEmployeeById:async(req,res)=>{
        try{
            let employee_id=req.params.id;

            let query="select employee.employee_id,employee.name,employee.email,employee.contact_no,employee.profile_image,employee.is_status,employee.department_id,department.dep_name from employee INNER JOIN department ON(employee.department_id=department.department_id) where employee.employee_id=? ";
            
                connection.query(query,[employee_id],(err,employeeData)=>{
                   if(err){
                     helper.handleError(res, 500, err);
                  }else {
                    if(employeeData.length>0){
                        
                        let respond={
                            employee_id:employeeData[0].employee_id,
                            name:employeeData[0].name,
                            email:employeeData[0].email,
                            contact_no:employeeData[0].contact_no,
                            profile_image:employeeData[0].profile_image,
                            is_status:employeeData[0].is_status,

                           department:{
                            department_id:employeeData[0].department_id,
                            dep_name:employeeData[0].dep_name,
                           },
                        }

                        // res.status(200).json({status:true,statuscode:200,message:"Employee Fatch Successfully",respond});
                        helper.respondAsJSON(res,"Employee Fatch Successfully.",respond,true,200);
                    }else{
                        helper.respondAsJSON(res,"404 Not Found.","Employee Not Found.",false,404);
                        
                    }
                }
             });
        }catch(Error){
            helper.handleError(res,"Catch Error",Error);
          return;
         }
    },

    deleteEmployeeById:async(req,res)=>{
        try{
            let employee_id=req.params.id;
            connection.query("select * from employee where employee_id=?",[employee_id],(err,employeeData)=>{
                if(err){
                    helper.handleError(res,500,err);
                }
                if(employeeData.length){
                    connection.query("delete from employee where employee_id=?",[employee_id],(err)=>{
                        if(err){
                            helper.handleError(res,500,err);
                        }else{
                            helper.respondAsJSON(res,"Employee Delete Successfully.","employee_id "+ employee_id,true,200);
                        }
                    });
                }else{
                    helper.respondAsJSON(res,"404 Not Found.","Employee Not Found.",false,404);
                }
            });
        }catch(Error){
            helper.handleError(res,"Catch Error",Error);
            return;
        }
    },

    updateEmployeeById:async(req,res)=>{
        try{
            let employee_id=req.params.id;

            const errors=validationResult(req);
            if(!errors.isEmpty()){
                helper.handleError(res,400,"Required inputs are invalid.",false,{error:errors.array()});
                return;
            }
            bcrypt.hash(req.body.password,10,(err,password)=>{
                if(err){
                    helper.handleError(res, 500, err);
                }else{
                    let employeeUpdatedData={
                        name:req.body.name,
                        email:req.body.email,
                        password:password,
                        contact_no:req.body.contact_no,
                        department_id:req.body.department_id ||1,
                        is_status:req.body.is_status || "Active",
                    }
                    connection.query("update employee set? where employee_id=?",[employeeUpdatedData,employee_id],(err,employeeUpdatedData)=>{
                        if(err){
                            helper.handleError(res,500,err)
                        }else{
                            helper.respondAsJSON(res,"Employee Update Successfully.",employeeUpdatedData,true,200);
                        }
                    });
                }
            });            
        }catch(Error){
            helper.handleError(res,"Catch Error",Error);
            return;
        }
    }
};