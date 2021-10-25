var express=require('express');
global.app=express();
global.multer=require('multer');
global.upload=require('express-fileupload');
const cors = require('cors');
 global.XLSX = require('xlsx');
global.router = express.Router();
var path = require('path');
global.fs= require('fs');
const bodyParser = require('body-parser');
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
global.helper= require('./utils/helper.js');
global.env = require('./config/config.js');
global.messages=require('./utils/massange.js');
global.constant =require('./utils/constants.js');
global.connect = require("./lib/db_helper");
global.dirname=__dirname;
module.exports = router;
app.use(cors());
//  app.use(upload());
 app.use("/api/v1",require('./routes/routes.js'));
var server =app.listen(8800);
 server.on('listening', onListening);
 server.setTimeout(50000);
function onListening() {
    let addr = server.address();
  
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.info(__filename, 'onListening', 'Listening on ' + bind);
  }
 