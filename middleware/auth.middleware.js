const jwt = require("jsonwebtoken")
require("dotenv").config()
const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(token){
        try {
            const decoded = jwt.verify(token,process.env.secretKey)
            if(decoded){
                req.body.userID = decoded.userID;
                req.body.user = decoded.user;
                next()
            }else{
                res.json({error:"Not Authorized!"})
            }
        } catch (error) {
            res.json({error:error.message})
        }
    }else{
        res.json({error:"Please login again!"})
    }
}

module.exports ={
    auth
}