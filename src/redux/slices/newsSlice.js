import { createSlice } from "@reduxjs/toolkit";
// import { backgroundColors } from "../../theme";

const initialState = {
  isLoading: false,
  error: null,
  data: [],
  newsList: [],
  categories: [],
  categoriesData: [],
};

const newsSlice = createSlice({
  initialState,
  name: "news",
  reducers: {
    newsRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    newsSuccess(state, action) {
      state.isLoading = false;
      state.newsList = action.payload.data.data;
      state.data = action.payload.data;
      state.error = null;
    },
    newsNextPageSuccess(state, action) {
      state.isLoading = false;
      state.newsList = state.newsList.concat(action.payload.data.data);
      state.data = action.payload.data;
      state.error = null;
    },
    newsError(state, action) {
      state.isLoading = false;
      state.error = action.payload.data;
    },
    categoriesRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    categoriesSuccess(state, action) {
      // if (action?.payload?.data?.data) {
      //   action.payload.data.data.map((category) => {
      //     category.backgroundColor =
      //       backgroundColors[
      //         Math.floor(Math.random() * backgroundColors.length)
      //       ];
      //   });
      // }
      state.isLoading = false;
      state.categories = action.payload.data.data;
      state.categoriesData = action.payload.data;
      state.error = null;
    },
    categoriesNextPageSuccess(state, action) {
      // if (action?.payload?.data?.data) {
      //   action.payload.data.data.map((category) => {
      //     category.backgroundColor =
      //       backgroundColors[
      //         Math.floor(Math.random() * backgroundColors.length)
      //       ];
      //   });
      // }
      state.isLoading = false;
      state.categories = state.categories.concat(action.payload.data.data);
      state.categoriesData = action.payload.data;
      state.error = null;
    },
    categoriesError(state, action) {
      state.isLoading = false;
      state.error = action.payload.data;
    },
  },
});

export const {
  newsRequest,
  newsSuccess,
  newsNextPageSuccess,
  newsError,
  categoriesRequest,
  categoriesSuccess,
  categoriesNextPageSuccess,
  categoriesError,
} = newsSlice.actions;

export default newsSlice.reducer;
