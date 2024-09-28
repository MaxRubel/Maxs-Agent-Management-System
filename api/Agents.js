import { createAsyncThunk } from "@reduxjs/toolkit";

const endpoint = import.meta.env.VITE_HTTP_SERVER;

export const getAllAgents = createAsyncThunk('getAllAgents', () => {
  return new Promise((resolve, reject) => {
    fetch(`${endpoint}/agents`)
      .then(resp => resp.json())
      .then(data => resolve(data))
      .catch(error => reject(error))
  });
})


