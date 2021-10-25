const async = require('async');
const path = require('path');
const http= require('http');

module.exports={
    uservalidate:async(req,res,next)=>{
        let getquery = await connect.query('select * from user_tab where email = "'+req.body.email+'"');
           if(getquery.length>0){
              if(getquery[0].password === req.body.password){
                return  helper.createResponse(
                    res,
                    constant.SUCCESS,
                    messages.LOGIN_SUCCESS,
                      {}
               )
             }
             else if(getquery[0].UserPass!==req.body.password){
                return  helper.createResponse(
                    res,
                    constant.UNPROCESSED,
                    messages.LOGIN_FIAL,
                      {}
               )
            }
        }
        else{
            return  helper.createResponse(
                res,
                constant.UNPROCESSED,
                messages.MODULE_NOT_FOUND("user"),
                  {}
           )

        }
 }
}