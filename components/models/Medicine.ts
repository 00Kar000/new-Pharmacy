import mongoose from "mongoose"


const MedicineShema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    group:{
        type:String,
    },
    number:{
        type:String,
    },
})


const Medicine = mongoose.models.Medicine ||  mongoose.model("Medicine", MedicineShema)

export default Medicine