import { createSelector } from "reselect";

export const getAllNews = createSelector(
  [(state) => state.newsList.data],
  (news) => news
);
