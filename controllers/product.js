const TB = require('../models/products')
const LIBBY = require('../utils/libby')

let add = async (req, res, next) => {
    console.log(req.body)
    let existProduct = await TB.findOne({ name: req.body.name })
    if (existProduct) {
        next(new Eroor('Product is alredy existed'))
        return
    }
    delete req.body.user
    let result = new TB(req.body)
    let save = await result.save()

    LIBBY.fMsg(res, 'New Product', result)
}

let all = async (req, res, next) => {
    let page = Number(req.params.page)
    let skipCount = page === 1 ? 0 : (page - 1) * Number(process.env.LIMIT_PAGE)
    let result = await TB.find()
        .sort({ _id: -1})
        .skip(skipCount)
        .limit(Number(process.env.LIMIT_PAGE))
    LIBBY.fMsg(res, 'All Product', result)
}

let catProducts = async (req, res, next) => {
    let results = await TB.find({ category: req.params.id })
    LIBBY.fMsg(res, 'Category Products', results)
}

let subcatProducts = async (req, res, next) => {
    let results = await TB.find({ sucat: req.params.id })
    LIBBY.fMsg(res, 'Category Products', results)
}

let childcatProducts = async (req, res, next) => {
    let results = await TB.find({ childcat: req.params.id })
    LIBBY.fMsg(res, 'Category Products', results)
}

module.exports = {
    add,
    all,
    catProducts,
    subcatProducts,
    childcatProducts,
}
