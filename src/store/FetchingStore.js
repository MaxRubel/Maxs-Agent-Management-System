import { configureStore } from "@reduxjs/toolkit";
import agentsReducer from "./agentsSlice";

// import logger from 'redux-logger';
// import { thunk } from 'redux-thunk';

export const fetchingStore = configureStore({
  reducer: {
    agents: agentsReducer,
  },
});