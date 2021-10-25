var express=require('express');
global.app=express();
const cors = require('cors');
global.router = express.Router();
var path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
global.helper= require('./utils/helper.js');
global.env = require('./config/config.js');
global.messages=require('./utils/massange.js');
global.constant =require('./utils/constants.js');
global.connect = require("./lib/db_helper");
module.exports = router;
app.use(cors());
 app.use("/api/v1",require('./routes/routes.js'));
var server =app.listen(8800);
 server.on('listening', onListening);
 server.setTimeout(50000);
function onListening() {
    let addr = server.address();
  
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.info(__filename, 'onListening', 'Listening on ' + bind);
  }
 