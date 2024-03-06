import mongoose from "mongoose";

let isConnected = false

const ConnectDB = async () =>{
    if(isConnected) return;
    try{
        await mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            // console.log("Mongo db atlas connected!")
        })
        .catch(err=>{console.log(err)})
    }
    catch(e){console.log(e)}
}

export default ConnectDB