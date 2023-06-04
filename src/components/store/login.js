import { createSlice } from "@reduxjs/toolkit";
const loginSlice= createSlice({
    name:"login",
    initialState:{
        status:!!localStorage.getItem("Token"),
    },
    reducers:{
        toggle(state){
          state.status=!state.status;
        }
    }
})

export const LoginActions=loginSlice.actions;

export default loginSlice.reducer;
