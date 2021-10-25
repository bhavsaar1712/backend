const creadintials ={
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'tournament',
    port :'3306',
    nodeport:'8000',
    bcrypt_salt: 10,
   jwt_secret: 'H$I8!Sr3Jp',
   jwt_expire_time: 300,
   platform_name: {
    doc: 'Platform name',
    format: String,
    default: 'gjMIS - Back End'
  },
  logFileSize: {
    doc: 'logs File Max File size',
    format: Number,
    default: 5242880 // Approx ~5.24288 MB
  }
    
};
module.exports= creadintials;