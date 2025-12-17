const jwt= require('jsonwebtoken');


const authenticate = (req, res, next)=>{
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.json({
            message: "Please provide the token"
        })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user=decoded;
    next();
};

module.exports = {
  authenticate
};