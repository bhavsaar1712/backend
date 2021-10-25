var express=require('express');
const router = require('express').Router();
module.exports = router
var app=express();
const schedule=require("./schedule.js");
router.get('/getteamlist',schedule.getteamlist);
router.post('/genratematch',schedule.matchscedule);
router.post('/resultadd',schedule.insertresults);
router.get('/getwinner',schedule.getwinnerlist);