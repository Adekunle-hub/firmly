// store/slices/uiSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: true,
  activeWorkspaceId: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setWorkspace: (state, action) => {
      state.activeWorkspaceId = action.payload;
    },
  },
});

export const { toggleSidebar, setWorkspace } = uiSlice.actions;
export default uiSlice.reducer;