import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface textBoxState {
  todoText: string;
}

const initialState: textBoxState = {
  todoText: "",
};

const textBoxSlice = createSlice({
  name: "textBox",
  initialState,
  reducers: {
    setTextBox: (state: textBoxState, action: PayloadAction<string>) => {
      state.todoText = action.payload;
    },
  },
});

export const { setTextBox } = textBoxSlice.actions;

export const selectTextBox = (state: RootState) => state.textBox.todoText;

export default textBoxSlice.reducer;
