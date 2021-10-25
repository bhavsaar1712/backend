const async = require('async');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null,'uploads/');
  },
  filename: (req, file, cb) => {
      console.log(file);
      cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });
module.exports={
  uservalidate:async(req,res,next)=>{
    let getquery = await connect.query('select email, password from user_tab where email = "'+req.body.Username+'"');
    console.log(getquery,"resume")
    console.log(req.body)  
    if(getquery.length>0){
        if(getquery[0].email!==req.body.Username){
            return  helper.createResponse(
                res,
                constant.UNPROCESSED,
                messages.LOGIN_FIAL,
                  {}
           )
        }
        if(getquery[0].password!==req.body.password){
            return  helper.createResponse(
                res,
                constant.UNPROCESSED,
                messages.LOGIN_FIAL,
                  {}
           )
        }
          if(getquery[0].password === req.body.password){
            return helper.createResponse(
                res,
                constant.SUCCESS,
                messages.loginSuccess,
                  {}
           )
         }
         else if(getquery[0].password!==req.body.password){
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
},
    
    getproductlist:async(req,res)=>{        
        let getquery =('SELECT ID, Name,email,image from product_list');
        let const1= constant.UNPROCESSED;
        let massage1=   messages.MODULE_NOT_FOUND('Name')
        let const2= constant.SUCCESS;
        let massage2= messages.MODULE_FOUND("Name")
        let data={};
        let pager={}
        addupdate(res,getquery,data,massage1,massage2,const1,const2,pager);      
       },
       insertdata:async(req,res)=>{
        let l=Math.random().toString(36).substr(2, 9);
        let name1=l+'user.png';
        let img1=req.body.data;
        var dat = img1.replace(/^data:application\/\w+;base64,/, "");
        const buffer2 = Buffer.from(dat, "base64");
        const imagePath1 = path.join(dirname +'/uploads',name1)
         fs.writeFileSync(imagePath1, buffer2);
         console.log( path.dirname(name1) )	
         let image1=dirname+'/uploads/'+name1
         let data={
           Name:req.body.Name,
           image:image1
        }    
        let getquery =('insert product_list set ?');
        console.log(getquery)
        let const1= constant.UNPROCESSED;
        let massage1=   messages.MODULE_STORE_ERROR('name')
        let const2= constant.SUCCESS;
        let massage2= messages.MODULE_STORE_SUCCESS("name")
        let pager={}
        addupdate(res,getquery,data,massage1,massage2,const1,const2,pager);      
       },
       updatedata:async(req,res)=>{
        let l=Math.random().toString(36).substr(2, 9);
        let name1=l+'user.png';
        let img1=req.body.data;
        var dat = img1.replace(/^data:application\/\w+;base64,/, "");
        const buffer2 = Buffer.from(dat, "base64");
        const imagePath1 = path.join(dirname +'/uploads',name1)
         fs.writeFileSync(imagePath1, buffer2);
         console.log( path.dirname(name1) )	
         let image1= dirname+'/uploads/'+name1
         let data={
           Name:req.body.Name,
           image:image1,
           email:req.body.email
        }    
        let getquery =('update product_list set ? where ID='+req.body.ID+'');
        console.log(getquery)
        let const1= constant.UNPROCESSED;
        let massage1=   messages.MODULE_UPDATE_ERROR('Name')
        let const2= constant.SUCCESS;
        let massage2= messages.MODULE_UPDATE_SUCCESS("Name")
        let pager={}
        addupdate(res,getquery,data,massage1,massage2,const1,const2,pager);      
       },
       deletedata:async(req,res)=>{    
        let getquery =('delete from  product_list where ID='+req.body.ID+'');
        console.log(getquery)
        let const1= constant.UNPROCESSED;
        let massage1=   messages.MODULE_DELETE_ERROR('product')
        let const2= constant.SUCCESS;
        let massage2= messages.MODULE_DELETE_SUCCESS("product")
        let pager={}
        addupdate(res,getquery,data,massage1,massage2,const1,const2,pager);      
       },
       
       
}
function addupdate(res,sqlQuery,data,massage1,massage2,const1,const2,pager){
    if(Object.keys(data).length==0){
     data==null;
      }
    connect.query(sqlQuery,data, function(err, data) {
          if(err){
              console.log(err)
             helper.createResponse(
                 res,
                 const1,
                 massage1,
                 {},
                 pager
               );
          } else {
             helper.createResponse(
                 res,
                 const2,
                 massage2,
                 {data},
                 pager
               );
                  }
             })            
         }