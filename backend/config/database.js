import mongoose from 'mongoose';

const dbConnection = () => {
    mongoose.connect(process.env.MONGODB_URI).then((data)=>console.log("Database Connection Success")).catch((err)=> console.log(err));

}


export default dbConnection;