const router = require('express').Router();
module.exports = router
const components = require('../app/productlistroutes');

router.use('/master',components);
