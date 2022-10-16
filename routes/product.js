const router = require('express-promise-router')()
const controller = require('../controllers/product');
const { ProductSchema } = require('../utils/Schema');
const {validateBody} = require('../utils/validator');


router.post('/',[validateBody(ProductSchema.add),controller.add]);


module.exports = router;