import { createSlice} from "@reduxjs/toolkit";
import * as actionLogin from '../Actions/Loading.action';
const initialState = {
    isLoading:false,
}

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
      setLoading: (state, action) => {
        return { ...state, isLoading: action.payload }
      },
    },
    // extraReducers: {

    //   [actionLogin.loading]: (state, action) => {
    //      return {...state,isLoading:true}
    //   },

    //   [actionLogin.closeLoading]: (state, action) => {
    //     return {...state,isLoading:false}
    //   },
    // },
  });
  const { reducer } = loadingSlice;
  export const { setLoading } = loadingSlice.actions;
  export default reducer;