
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.auth = (req, res, next) => {

    try{

        console.log("cookie", req.cookies.token);
        console.log("body", req.body.token);
        console.log("header", req.header("Authorization"));

        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");
        

        if(!token || token === undefined){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            })
        }

        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);

            req.user = payload;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })
        }
        next();
    }
    catch(error){
        res.status(401).json({
            success:false,
            message:"Error in Authentication, Token Error"
        })
    }
}

exports.isStudent = (req, res, next) => {
    try{

        if(req.user.role != "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a Protected route for Students"
            })
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User Role is not matching"
        })
    }
}

exports.isAdmin = (req, res, next) => {
    try{

        if(req.user.role != "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a Protected route for Admin"
            })
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User Role is not matching"
        })
    }
}