import { configureStore, createSlice } from "@reduxjs/toolkit";
import { assign, values } from "lodash-es";
import { v4 } from "uuid";
import { ObservableBlockMap, createObservableBlock } from "./rx-store";

const arr = [...new Array(50000)];

export interface BlockDTO {
  id: string;
  title: string;
}

export type StoreType = Record<string, BlockDTO>;

export const defaultState: StoreType = {};

arr.forEach(() => {
  const id = v4();
  const item = {
    id,
    title: `Todo ${id}`,
  };
  defaultState[id] = item;
});

const blocksSlice = createSlice({
  name: "blocks",
  initialState: {} as StoreType,
  reducers: {
    updateBlocks: (state, { payload }) => {
      const { blocks } = payload;
      assign(state, blocks);
      values(blocks).forEach((block: BlockDTO) => {
        createObservableBlock(block);
      });
    },
    updateBlock: (state, { payload }) => {
      const { id, title } = payload;
      state[id] = {
        ...state[id],
        title,
      };
      ObservableBlockMap.get(id)?.next(state[id]);
    },
  },
});

export const updateAction = blocksSlice.actions;

export const store = configureStore({
  reducer: blocksSlice.reducer,
});
