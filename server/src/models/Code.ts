import mongoose from "mongoose"


//THIS FILE IS BASICALLY CREATING THE KEY VALUES(ROWS,COLUMNS) OF HOW THE CODE WILL BE STORED IN DATABASE

//TYPESCRIPT
// In the context of Mongoose schemas, using an interface allows you to define the expected shape of documents 
//that will be stored in the MongoDB collection.
interface ICodeSchema{

    fullCode:{
        html:string,
        css:string,
        javascript:string,
    }
}

//mongoose structure
//we are defining full code again because we want to make sure that it uses correct datatypes, Or suppose we want to make any field important etc.
const CodeSchema=new mongoose.Schema<ICodeSchema>({
    fullCode:{
        html:String,
        css:String,
        javascript:String,
    }
});

//CREATED THE TABLE IN MONGODB
export const Code=mongoose.model("Code",CodeSchema);