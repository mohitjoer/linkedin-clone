import mongoose from "mongoose"

const connectionstring = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_USERNAME}@cluster-1.hp54uzv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-1`

if (!connectionstring){
    throw new Error ("please provide a valid connection string");
}

const connectDB = async () =>{
    if (mongoose.connection?.readyState >= 1){
        
        return;
    }


    try{
        console.log("-----Connected To Database-----")
    } catch (error) {
        console.log("-----Error conneting to Database-----")
        console.log(error);
    }
};

export default connectDB;