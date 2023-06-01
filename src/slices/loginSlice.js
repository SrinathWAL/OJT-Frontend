import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin=createAsyncThunk('login/userLogin',async(userCredObj,{rejectWithValue})=>{
    try{
    //Axios Request is made to get the userData from backend
    let res=await axios.post("http://localhost:4000/user/loginUser",userCredObj)
    //storing the token in session storage
    if(res.data.message==="Login success"){
        //Set the Token to session storage after Successfull login
        // sessionStorage.setItem("token",res.data.token);
        localStorage.setItem("token",JSON.stringify(res.data.payload));
        localStorage.setItem("user",JSON.stringify(res.data.user))
        localStorage.setItem("status","success");
        return res.data
    }
    else{
            //Else display an error Message
            throw new Error(res.data.message);
        }
    }catch(err){
        return rejectWithValue(err);
    }
    
})
let user=localStorage.getItem("user")
if(user){
    user=JSON.parse(user)
}
else{
    user={}
}
let status=localStorage.getItem("status")
//Creating a Login Slice
export const loginSlice=createSlice({
    name:"login",
    initialState:{
        userObj:user,
        userLoginStatus: false,
        errorMessage: "",
        status: status
    },
    reducers:{
        //To clear State in case of Logout 
        clearState:(state,action)=>{
            localStorage.clear()
            state.userObj={}
            state.errorMessage=""
            state.status="idle"
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(userLogin.pending,(state)=>{
            state.status='pending'
        });
        builder.addCase(userLogin.fulfilled,(state,action)=>{
            state.userObj=action.payload.user;
            state.userLoginStatus=true;
            state.errorMessage="";
            state.status='success'
        });
        builder.addCase(userLogin.rejected,(state,action)=>{
            state.errorMessage=action.payload.message;
            state.userLoginStatus=false;
            state.status='failed'
        });
    
    }
})

export const {clearState}=loginSlice.actions
export default loginSlice.reducer