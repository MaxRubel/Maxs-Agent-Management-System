import { createSlice } from "@reduxjs/toolkit";
import { sampleAgents } from "../../sampleData/sampleAgents";

const agentsSlice = createSlice({
  name: "agents",
  initialState: { agents: sampleAgents },
  reducers: {
    addAgent: (state, action) => {
      state.agents.push(action.payload)
    },
    updateAgent: (state, action) => {
      const updateIndex = state.agents.findIndex(item => item.id === action.payload.id)
      state.agents[updateIndex] = action.payload
    },
    removeAgent: (state, action) => {
      state.agents = state.agents.filter((agent) => agent.id !== action.payload.id);
    }
  },
});

export const { removeAgent, addAgent, updateAgent } = agentsSlice.actions;

export default agentsSlice.reducer;