const connection = require("../db/db.connection");
const helper=require('../helper/common.helper');

module.exports = {
  
  uploadProfileImage: (req, res) => {
    try{
        if (req.file.filename) {
            let employee_id=req.params.id;
            let filePath='/upload/'+req.file.filename;
            
            connection.query("select * from employee where employee_id=?",[employee_id],(err,employeeData)=>{
              if(err){
                helper.handleError(res, 500, err);
              }
              if(employeeData.length){
                  connection.query("update employee set profile_image=? where employee_id=?",[filePath,employee_id],(err)=>{
                    if(err){
                        helper.handleError(res, 500, err);
                    }else{
                        helper.respondAsJSON(res,"Image Upload Successfully.",filePath,true,200);
                    }
                  });
              }
              else{
                helper.respondAsJSON(res,"404 Not Found.","No Employee Found",false,404);
              }
            });
        } else {
          helper.handleError(res, 500,"Something went to wrong!",err);
        }
    }catch(Error){
        helper.handleError(res,"Catch Error",Error);
        return;
    }
  },
};
