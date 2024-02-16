const mongoose  = require( "mongoose");

const connectDB=async ()=>{
    try{
        const conn = await mongoose.connect('mongodb+srv://alan:AlanAlan123@cluster0.kvq42ux.mongodb.net/healthyTouch')
        console.log(`mongoDB connected : ${conn.connection.host}` )
    }
    catch(error){
        console.error(`${error.message}`)
        process.exit(1)
    }
}
module.exports = connectDB;