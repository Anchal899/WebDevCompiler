import mongoose from "mongoose"

export const dbConnect =async () => {
   try{
    await mongoose.connect(process.env.MONGO_URL!,{
        dbName:"Online-Compiler",
       });
       console.log("MongoDB connection established");
   }
   catch(error){
    console.log("MongoDB connection not established",error);
   }
};