import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    token :"",
    loading:"false",
    error:""
}
const fetchUser = createAsyncThunk(
    'signup',
    async => {
      const res = await  fetch('signup', {
            method: 'Post',
            headers:{
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify(body)
        })
        return await res.json()
    }
)
const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers:{
          [fetchUser.fulfilled] : (state, action) =>{

          },
          [fetchUser.rejected] : (state, action) =>{
              
        }
    }

})