const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    count: { type: Number, required: true },
    totals: { type: Number, required: true },
    status: { type: Boolean, default: false },
    items: [{ type: Schema.Types.ObjectId,required:true,ref: 'orderitem' }],
    creatd: { type: Date, default: Date.now },
})

const Order = mongoose.model('order', OrderSchema)

module.exports = Order
