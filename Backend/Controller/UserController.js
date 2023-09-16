import UserModel from "../Model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const Register = async (req, res) => {
    try {
      
      const { name, email, password, role  } = req.body.userdata;
      if (!name || !email || !password || !role )
        return res.json({
          success: false,
          message: "All fields are mandtory.."
        });
  
      const isEmailExist = await UserModel.find({ email: email });
      if (isEmailExist.length) {
        return res.json({
          success: false,
          message: "Email is exist, try diffrent email."
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({ name, email, password: hashedPassword, role });
  
      await user.save();
  
      return res.json({
        success: true,
        message: "User registered Successfully.",
        user: user,
      });
    } catch (error) {
      return res.json({ success: false, message: error });
    }
  };
  
  export const Login = async (req, res) => {
    try {
      const { email, password } = req.body.userdata;
      if (!email || !password)
        return res.json({
          success: false,
          message: "All fields are mandtory..",
        });
  
      const user = await UserModel.findOne({ email });
      if (!user) return res.json({ success: false, message: "User not found.." });
  
     
  
      const isPasswordRight = await bcrypt.compare(password, user.password);
     
      if (isPasswordRight) {
        const userObeject = {
          name: user.name,
          email: user.email,
          _id: user._id,
          role:user.role
        };
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
       
        return res.json({
          success: true,
          message: "Login Successfull.",
          user: userObeject,
          token: token,
        });
      }
      return res.json({ success: false, message: "Password is wrong." });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  };


export const getCurrentUser = async (req , res) => {
    try {
        const {token} = req.body.userdata

        if(!token){return res.json({ success: false, message: "token is valid" })}

        const decodedData = jwt.verify(token , process.env.JWT_SECRET)
        if(!decodedData){
            return res.json({ success: false, message: "not a is valid token"})
        }
     const userId = decodedData.userId
     const user = await UserModel.findById(userId)
     if(!user){
        return res.json({ success: false, message: "user not found"})
     }
     const userObeject = {
        name: user.name,
        email: user.email,
        _id: user._id,
        role:user.role
      };
     return res.json({ success: true, message: "Current User" , user:userObeject})

        
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }


}