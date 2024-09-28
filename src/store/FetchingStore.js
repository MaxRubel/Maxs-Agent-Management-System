import { configureStore } from "@reduxjs/toolkit";
import agentReducer from "./agentsSlice";

export const fetchingStore = configureStore({
  reducer: {
    agents: agentReducer,
  },
})