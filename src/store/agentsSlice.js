import { createSlice } from "@reduxjs/toolkit";
import { agentsApi } from "../../api/Agents";

const agentsSlice = createSlice({
  name: "agents",
  initialState: { agents: [] },
  reducers: {
    removeAgent: (state, action) => {
      state.agents = state.agents.filter(agent => agent.id !== action.payload);
    },
    addAgent: (state, action) => {
      state.agents.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(
        agentsApi.endpoints.getAllAgents.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        agentsApi.endpoints.getAllAgents.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.agents = action.payload;
        }
      )
      .addMatcher(
        agentsApi.endpoints.getAllAgents.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  }
});

export const { removeAgent, addAgent } = agentsSlice.actions;

export default agentsSlice.reducer;