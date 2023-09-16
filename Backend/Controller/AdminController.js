import QuestionModel from "../Model/QuestionModel.js";
import jwt from 'jsonwebtoken'


export const Addquestion = async(req , res ) => {


    try {
        const {question , answer , token} = req.body.questiondata
        if(!question || !answer || !token){
            return res.json({ success: false, message: "add all the fields" });
        }

        const decodedData = jwt.verify(token , process.env.JWT_SECRET)
        if(!decodedData){
            return res.json({ success: false, message: "not a is valid token"})
        }
        const userId = decodedData.userId

        const user = new QuestionModel({question , answer , token , userId:userId})

        await user.save();
        return res.json({ success: true, message: "qusetion added succesfull "})
        
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }


}

export const allQuestion = async (req , res) => {
try {
    const allquestion = await QuestionModel.find({})
    if(!allquestion){
        return res.json({ success: false, message: "no qustions added" });
    }
    return res.json({ success: true, message: "all questions" ,question: allquestion});
    
} catch (error) {
    return res.json({ success: false, message: error.message });
}
}