const router = require('express-promise-router')()
const UserController = require('../controllers/user')
const ProductController = require('../controllers/product')
const CategoryController = require('../controllers/category')
const ChildCatController = require('../controllers/childcat')
const SubCatController = require('../controllers/subcat')
const OrderController = require('../controllers/order')
const TagController = require('../controllers/tag')
const {
    validateBody,
    validateParam,
    tokenValidate,
} = require('../utils/validator')

const { UserSchema, AllSchema } = require('../utils/Schema')

router.post('/register', [
    validateBody(UserSchema.register),
    UserController.register,
])

router.post('/login', [validateBody(UserSchema.login), UserController.login])

router.get('/products/:page', [
    validateParam(AllSchema.page, 'page'),
    ProductController.all,
])

router.get('/cats', CategoryController.all)

router.post('/order', [tokenValidate(), OrderController.add])

router.get('/childcats', ChildCatController.all)

router.get('/', SubCatController.all)

router.get('/', TagController.all)

router.get('/pro/cat/:id', [
    validateParam(AllSchema.id, 'id'),
    ProductController.catProducts,
])

router.get('/pro/subcat/:id', [
    validateParam(AllSchema.id, 'id'),
    ProductController.subcatProducts,
])

router.get('/pro/childcat/:id', [
    validateParam(AllSchema.id, 'id'),
    ProductController.childcatProducts,
])

module.exports = router
