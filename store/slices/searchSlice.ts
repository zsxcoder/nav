import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Link } from '@/types';

/**
 * Search 状态接口
 */
interface SearchState {
  /** 搜索关键词 */
  query: string;
  /** 搜索结果 */
  results: Link[];
  /** 是否正在搜索 */
  isSearching: boolean;
}

/**
 * 初始状态
 */
const initialState: SearchState = {
  query: '',
  results: [],
  isSearching: false,
};

/**
 * Search Slice
 * 管理搜索状态
 */
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    /**
     * 设置搜索关键词
     */
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.isSearching = action.payload.length > 0;
    },

    /**
     * 设置搜索结果
     */
    setResults: (state, action: PayloadAction<Link[]>) => {
      state.results = action.payload;
    },

    /**
     * 清除搜索
     */
    clearSearch: (state) => {
      state.query = '';
      state.results = [];
      state.isSearching = false;
    },

    /**
     * 设置搜索状态
     */
    setSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
  },
});

/**
 * 导出 actions
 */
export const {
  setQuery,
  setResults,
  clearSearch,
  setSearching,
} = searchSlice.actions;

/**
 * 导出 reducer
 */
export default searchSlice.reducer;
