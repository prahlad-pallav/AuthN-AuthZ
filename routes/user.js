
const express = require("express");
const router = express.Router();

const {login, signup} = require("../Controller/Auth");
const {auth, isAdmin, isStudent} = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);

router.get("/visitor", auth, (req, res) => {
    res.status(200).json({
        success:true,
        message:"Welcome to Protected route for Visitors"
    });
})

router.get("/student", auth, isStudent, (req, res) => {
    res.status(200).json({
        success:true,
        message:"Welcome to Protected route for Students"
    });
} );

router.get("/admin", auth, isAdmin, (req, res) => {
    res.status(200).json({
        success:true,
        message:"Welcome to Protected route for Admins"
    });
} );

module.exports = router;