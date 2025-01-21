import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/combine_reducer/root_reducer";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist"
import { persistStore } from 'redux-persist';



const persistConfig = {
    key : "root",
    version : 1,
    storage
}



const persistedReducer = persistReducer(persistConfig, rootReducer);



 const store = configureStore({
    reducer: {
      Reducer: persistedReducer,
    },
  });


let persistor = persistStore(store);

export {store, persistor}
  