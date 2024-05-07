import {PayloadAction, createSlice} from "@reduxjs/toolkit";

export interface CompilerSliceStateType{
    fullCode:{
        html:string;
       css:string;
       javascript:string;
       java:string;
    };
    
    currentLanguage:"html" | "css" | "javascript"|"java";
    
}
const initialState : CompilerSliceStateType= {
    fullCode:{
        html:`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Basic Example</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <h1>Hello, World!</h1>
 
  
  <button id="changeText">Click me!</button>

<script src="script.js"></script>
</body>
</html>
        `,
        css:"body{}",
        javascript:"console.log(Hello World)",
        java:`public class HelloWorld(){
            public static void main(String[] args){

            }
        }`
    },
   
    currentLanguage:"html",
   
}
const compilerSlice=createSlice({
    name:"compilerSlice",
    initialState,
    reducers:{
        updateCurrentLanguage:(state,action: PayloadAction<CompilerSliceStateType["currentLanguage"]>)=>{
            state.currentLanguage=action.payload;
        },
       updateCodeValue:(state,action: PayloadAction<string>)=>{
        
        state.fullCode[state.currentLanguage]=action.payload;
       },
       updatefullCode:(state,action: PayloadAction<CompilerSliceStateType["fullCode"]>)=>{
        
        state.fullCode=action.payload;
       },
    },
});

export default compilerSlice.reducer;
export const {updateCurrentLanguage,updateCodeValue,updatefullCode} =  compilerSlice.actions;