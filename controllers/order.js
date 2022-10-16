const TB = require('../models/order')
const LIBBY = require('../utils/libby')
const OrderItemTB = require('../models/orderItem')
const ProductTB = require('../models/products')
let add = async (req, res, next) => {
    let order = await new TB()
    const { userData, items } = req.body

    let insertItems = []

    for await (let item of items) {
        let product = await ProductTB.findById(item.id)
        insertItems.push({
            user:userData._id,
            order: order._id,
            count: item.count,
            price: product.price,
            productId: product._id,
            name: product.name,
            images: product.images,
            discount: product.discount,
            status: product.images,
        })
    }

    let itemResults = await OrderItemTB.insertMany(insertItems)

    let itemIds = []
    itemResults.map(item => itemIds.push(item._id))

    let totals = itemResults.reduce((a, b) => a + b.count * b.price, 0)

    order.user = userData._id
    order.count = items.length
    order.totals = totals
    order.items = itemIds

    let result = await order.save()

    LIBBY.fMsg(res, 'Order Accepted', result)
}

module.exports = {
    add,
}
