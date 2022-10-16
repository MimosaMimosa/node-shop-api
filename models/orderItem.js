const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderItemSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    order: { type: Schema.Types.ObjectId, required: true, ref: 'order' },
    count: { type: Number, required: true },
    productId: { type: Schema.Types.ObjectId, required: true, ref: 'product' },
    price: { type: Number, required: true },
    name: { type: String, required: true },
    images: { type: Array, required: true },
    discount: { type: Number, default: 0 },
    create: { type: Date, default: Date.now },
})

const OrderItem = mongoose.model('orderitem', OrderItemSchema)

module.exports = OrderItem
