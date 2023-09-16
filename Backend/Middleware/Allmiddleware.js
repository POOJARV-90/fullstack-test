import UserModel from "../Model/UserModel.js"
import jwt from "jsonwebtoken"



export const isAmin = async (req , res , next) => {
try {
    const {token} = req.body

        if(!token){return res.json({ success: false, message: "token is valid" })}

        const decodedData = jwt.verify(token , process.env.JWT_SECRET)
        if(!decodedData){
            return res.json({ success: false, message: "not a is valid token"})
        }
     const userId = decodedData.userId
     const user = await UserModel.findById(userId)
     if(!user||user.role !== "Admin"){
        return res.json({ success: false, message: "you are not a admin you cannont add qussetion"})
     }
     next()
} catch (error) {
    return res.json({ success: false, message: error.message });
}

}