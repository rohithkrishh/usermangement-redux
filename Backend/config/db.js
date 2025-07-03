
const mongoose =  require('mongoose');

const connectDB = async ()=>{
    try {
       await mongoose.connect('mongodb://localhost:27017/USER-MANAGEMENT-SYSTEMS');
       console.log("mongodb connecte successfully");
    } catch (error) {
        console.error('Databse connection error:',error);
        process.exit(1);
    }
}


module.exports = connectDB;