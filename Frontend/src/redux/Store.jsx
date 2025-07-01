import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage/";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./slice/UserSlice";
import adminReducer from "./slice/AdminSlice";

const authPersistConfig = {
  key: "auth",
  storage,
};

const adminPersistConfig = {
  key: "admin",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  admin: persistReducer(adminPersistConfig, adminReducer),
});

const Store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(Store);
export default Store;
