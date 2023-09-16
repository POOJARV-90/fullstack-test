import mongoose, { Schema } from "mongoose";


const Userschema = new Schema({
name:{
    type:String ,
    required : true  
},
email:{
    type:String ,
    required : true  
}
,
password:{
    type:String ,
    required : true  
}
,
role:{
    type:String ,
    enum :["User" , "Admin"] ,
    default:"User"
}


})


export default mongoose.model("User",Userschema)