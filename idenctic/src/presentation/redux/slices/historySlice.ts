import { HistoryEntity, DataHistory } from "@/domain/entities";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface HistoryState {
  histories: DataHistory[];
  page: number;
  limit: number;
  totalPage: number;
  searchs: DataHistory[];
}

const initialState: HistoryState = {
  histories: [],
  page: 0,
  limit: 10,
  totalPage: 0,
  searchs: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setHistories: (state, action: PayloadAction<HistoryEntity>) => {
      state.histories = action.payload.data ?? [];
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.totalPage = action.payload.totalPage;
    },
    appendHistories: (state, action: PayloadAction<HistoryEntity>) => {
      state.histories = [...state.histories, ...(action.payload.data ?? [])];
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.totalPage = action.payload.totalPage;
    },
    clearHistories: (state) => {
      state.histories = [];
      state.page = 0;
      state.limit = 10;
      state.totalPage = 0;
    },
    setSearchs: (state, action: PayloadAction<DataHistory[]>) => {
      state.searchs = action.payload ?? [];
    },
    clearSearchs: (state) => {
      state.searchs = [];
    },
  },
});

export const {
  setHistories,
  appendHistories,
  clearHistories,
  setSearchs,
  clearSearchs,
} = historySlice.actions;
export default historySlice.reducer;
