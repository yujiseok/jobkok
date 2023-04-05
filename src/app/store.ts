import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import postSignUp from "../features/signUpSlice";

const persistConfig = {
  key: "root",
  storage: storage, // 저장 공간
  whitelist: [], // persist 적용하고 싶은 값
  blacklist: ["postSignUp"], // persist 적용하지 않을 내용
};

const reducer = combineReducers({
  postSignUp: postSignUp,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
