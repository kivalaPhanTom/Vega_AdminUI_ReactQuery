import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
// import allReducer from './AllReducers'
import createSagaMiddleware from "redux-saga";
// import vocabularySlice from './slices/Vocabulary.slice';
import loginSlice from './slices/Login.slice';
// import vocabularyCheckingSlice from './slices/VocabularyChecking.slice';
import rootSaga from "./Sagas/RootSaga";
let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];
const allReducer = {
    loginSlice
    // vocabulary: vocabularySlice,
    // vocabularyCheckingSlice:vocabularyCheckingSlice,
  }
const store = configureStore({
    reducer: allReducer,
    middleware
})
sagaMiddleware.run(rootSaga);
export default store