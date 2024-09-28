import { createSlice } from "@reduxjs/toolkit";
import { getAllAgents } from "../../api/Agents";

const initialState = {
  loading: false,
  agents: [],
  error: "",
}

const agentsSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    removeAgent: (state, action) => {
      state.agents = state.list.filter(agent => agent.id !== action.payload);
    },
    addAgent: (state, action) => {
      state.agents.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllAgents.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getAllAgents.fulfilled, (state, action) => {
      state.loading = false
      state.agents = action.payload
      state.error = ''
    })
    builder.addCase(getAllAgents.rejected, (state, action) => {
      state.loading = false
      state.users = []
      state.error = action.error.message
    })
  }
})

export const { getAll, getSingle, deleteSingle } = agentsSlice.actions

export default agentsSlice.reducer;