import { configureStore } from "@reduxjs/toolkit";
import agentsReducer from "./agentsSlice";
import { agentsApi } from "../../api/Agents";

// import logger from 'redux-logger';
// import { thunk } from 'redux-thunk';

export const fetchingStore = configureStore({
  reducer: {
    agents: agentsReducer,
    [agentsApi.reducerPath]: agentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(agentsApi.middleware)
  // .concat(logger)
  // .concat(thunk),
});