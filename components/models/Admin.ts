import mongoose from "mongoose"


const adminShema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})


const Admin = mongoose.models.Admin ||  mongoose.model("Admin", adminShema)

export default Admin