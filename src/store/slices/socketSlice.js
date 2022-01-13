import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  isEstablishingConnection: false,
  isConnected: false,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    startConnecting: (state) => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    },
    receiveAllMessages: (state, action) => {
      state.messages = action.payload.messages;
    },
    receiveMessage: (state, action) => {
      state.messages.push(action.payload.message);
    },
    submitMessage: () => {
      return;
    },
  },
});

export const socketActions = socketSlice.actions;

export default socketSlice;
