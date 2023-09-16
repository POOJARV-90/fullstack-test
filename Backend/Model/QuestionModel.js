

import mongoose, { Schema } from "mongoose";

const Questionschema = new Schema({
    question: {
        type :String,
        required : true
    },
    answer: {
        type :String,
        required : true
    }
    ,
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        
    }

})

export default mongoose.model("Questions" , Questionschema)