var express=require('express');
const router = require('express').Router();
module.exports = router
var app=express();
const schedule=require("./productcontroller");
router.get('/getproductlist',schedule.getproductlist);
router.post('/addproduct',schedule.insertdata);
router.post('/login',schedule.uservalidate);
router.post('/updateproduct',schedule.updatedata);
router.post('/deleteproduct',schedule.deletedata);

