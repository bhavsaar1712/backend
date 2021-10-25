const async = require('async');
const path = require('path');
module.exports={
    getwinnerlist:async(req,res)=>{        
        let getquery =('SELECT tm.name,sc.winner as teamcount  from schedule as sc join teams as tm where sc.matchname="'+req.query.matchname+'"and  sc.round="'+req.query.round+'" and sc.winner=tm.TeamCount ');
        let const1= constant.UNPROCESSED;
        let massage1=   messages.MODULE_NOT_FOUND('winners')
        let const2= constant.SUCCESS;
        let massage2= messages.MODULE_FOUND("winners")
        let data={};
        let pager={}
        addupdate(res,getquery,data,massage1,massage2,const1,const2,pager);      
       },
    getteamlist:async(req,res)=>{        
        let getquery =("SELECT * from teams");
        let const1= constant.UNPROCESSED;
        let massage1=   messages.MODULE_NOT_FOUND('teamlist')
        let const2= constant.SUCCESS;
        let massage2= messages.MODULE_FOUND("teamlist")
        let data={};
        let pager={}
        addupdate(res,getquery,data,massage1,massage2,const1,const2,pager);      
       },
       insertresults:async(req,res)=>{        
        let getquery =('update schedule set winner ="'+req.body.winner+'" where part1="'+req.body.part1+'" and part2="'+req.body.part2+'" and matchname="'+req.body.matchname+'" and round="'+req.body.round+'" ');
        console.log(getquery)
        let const1= constant.UNPROCESSED;
        let massage1=   messages.MODULE_STORE_ERROR('winner')
        let const2= constant.SUCCESS;
        let massage2= messages.MODULE_STORE_SUCCESS("winner")
        let data={};
        let pager={}
        addupdate(res,getquery,data,massage1,massage2,const1,const2,pager);      
       },
       matchscedule:async(req,res)=>{ 
          console.log(req.body) //match
          let dataaa,name=null;
          if(req.body.hasOwnProperty('matchname')==false){
            await connect.query('update teams set matchnameid=matchnameid+1 where TeamCount = 1');
             dataaa = await connect.query('select matchnameid from teams where TeamCount = 1'); 
             name=dataaa[0]['matchnameid'];
          }
      let getquery;
      if(req.body.round=='1'){
         getquery = await connect.query("SELECT * from teams");
      }
      else{
        getquery = await connect.query('SELECT winner from schedule where matchname='+req.body.matchname+' and round ='+req.body.round+'-1 and winner!=""');
      }
          console.log(getquery)
          let n = getquery.length;
          let data9=[]
          if(n!=0){
          for(let i=0; i<getquery.length/2;i++){
            n=n-1;
            let data4={
                matchname:req.body.matchname?req.body.matchname:name,
                part1:getquery[i]['TeamCount']?getquery[i]['TeamCount']:getquery[i]['winner'],
                part2:getquery[n]['TeamCount']?getquery[n]['TeamCount']:getquery[n]['winner'],
                round:req.body.round?req.body.round:1
            }
            data9.push(Object.values(data4))                     
          }
           getquerys = ("insert into schedule (matchname,part1,part2,round) values ?");
          let const1 = constant.UNPROCESSED;
          let massage1 = messages.MODULE_STORE_ERROR('schedule')
          let const2 = constant.SUCCESS;
          let massage2 = messages.MODULE_STORE_SUCCESS("schedule")
          let data={};
          let pager={}
        addupdate(res,getquerys,[data9],massage1,massage2,const1,const2,pager); 
          }else{
            helper.createResponse(
                res,
                const1=200,
                massage1="winners are not decleard",
                {},
                pager={}    
              );
          }     
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