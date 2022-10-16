const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');

let fMsg = (res, msg, result = {}) => {
   res.status(200).json({ con: true, msg, result });
}

module.exports = {
   fMsg,
   encode: (payload) => bcrypt.hashSync(payload, 10),
   comPass:(plan,hash) => bcrypt.compareSync(plan,hash),
   genToken:(data)=>jwt.sign({exp:Math.floor(Date.now()/1000) + 2 * 24 * 60 * 60,data},process.env.JWT_SECRET)
}