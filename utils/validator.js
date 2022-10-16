const jwt = require('jsonwebtoken')
module.exports = {
   validateBody: schema => {
      return (req, res, next) => {
         let result = schema.validate(req.body);
         if (result.error) {
            next(new Error(result.error.details[0].message));
         } else {
            next();
         }
      }
   },
   validateParam: (schema, name) => {
      return (req, res, next) => {
         let obj = {};
         obj[`${name}`] = req.params[`${name}`];
         let result = schema.validate(obj);
         if (result.error) {
            next(new Error(result.error.details[0].message));
         } else {
            next();
         }
      }
   },
   tokenValidate:()=>{
      return (req,res,next)=>{
         if(req.headers.authorization){
            let token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
                  if(!err){
                     req.body.userData = decoded.data;
                     next();
                  }
             });
             
         }else next(new Error('Token Expired'))
         
         
      }
   }
}