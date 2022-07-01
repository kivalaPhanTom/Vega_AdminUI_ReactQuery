import { createSlice} from "@reduxjs/toolkit";
import * as actionLogin from '../Actions/Loading.action';
const initialState = {
    isLoading:false,
}

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    extraReducers: {

      [actionLogin.loading]: (state, action) => {
         return {...state,isLoading:true}
      },

      [actionLogin.closeLoading]: (state, action) => {
        return {...state,isLoading:false}
      },
    },
  });
  const { reducer } = loadingSlice;
  export default reducer;