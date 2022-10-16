const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductSchema = new Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'category' },
    subcat: { type: Schema.Types.ObjectId, ref: 'subcat' },
    childcat: { type: Schema.Types.ObjectId, ref: 'childcat' },
    tag: { type: Schema.Types.ObjectId, ref: 'tag' },
    discount:{type:Number,default:0},
    refund: { type: String, enum: ['Yes', 'No', 'In_10_days'], default: 'No' },
    features: { type: Object, required: true },
    images:{type:Array,required:true},
    colors:{type:Array,required:true},
    created:{type:Date,default:Date.now}
})


const Product  = mongoose.model('product',ProductSchema);


module.exports = Product
