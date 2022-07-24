const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const fetchuser = require('../middleware/fetchuser')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const JWT_SECRET = "lad";

// route 1: create User  POST /api/auth/createuser No Login required
router.post(
  "/createuser",
  [
    body("name", "min length of name should be 3").isLength({ min: 3 }),
    body("email", "invalid email").isEmail(),
    body("password", "min length of password should be 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //check for validation error
    const error = validationResult(req);
    if (!error.isEmpty()) {
      success = false;
      return res.status(400).json({ success, errors: error.array() });
    }

    try {
      //find user with same email exited already or not
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        success = false;
        return res.status(400).json({ success, errors: "invalid crediantial" });
      }

      //for seccure password
      const salt = await bcrypt.genSalt(10);
      secpass = await bcrypt.hash(req.body.password, salt);

      //new user created
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });

      //to generate auth token
      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success, authToken });
    } catch (error) {
      success = false;
      console.log(error);
      res.status(500).json({ success, error:"internal server error" })
    }
  }
);

// route 2: Login User  POST /api/auth/login  No Login required
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','pasword cannot be blank').exists()
], async (req,res)=>{
 
    //If there are error return bad request and errors
   const errors = validationResult(req)
   if(!errors.isEmpty()){
    success =false
    return res.status(400).json({success,error:errors.array()});
   }
   const {email,password} = req.body;
   try{
    let user = await User.findOne({email})
    if(!user){
        success =false
       return res.status(400).json({success,error:"please try with correct credintial"});
    }  

    let passwordCompare = await bcrypt.compare(password,user.password);
    console.log(passwordCompare)
    if(!passwordCompare){
        success=false
        return res.status(400).json({success,error:"please try with correct credintial"});
    }
    const data = {
        user:{
            id:user.id
        }
    }
    const authToken =jwt.sign(data,JWT_SECRET)
    success=true
    res.json({success,authToken})
} catch(error){
    console.error(error.message);
    res.status(500).send("internal server Error")
}
})

//route 3: get user /api/auth/getuser login required
router.post('/getuser',fetchuser,async (req,res)=>{
    try {
        userId = req.user.id;
        const user =await User.findById(userId).select("-password");
        res.send(user);
        
    } catch (error) {
        console.error(error.message);
    res.status(500).send("internal server Error")
    }
})





module.exports = router;
