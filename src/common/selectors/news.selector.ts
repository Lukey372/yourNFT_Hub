import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

const newsReducer = (state: AppState) => state.news;

export const newsListSelector = createSelector(
  newsReducer,
  (news) => news.newsList
);
export const singleNewsSelector = createSelector(
  newsReducer,
  (news) => news.singleNews
);
export const newsLoadingSelector = createSelector(
  newsReducer,
  (news) => news.loading
);
export const featuredNewsSelector = createSelector(
  newsReducer,
  (news) => news.featuredNews
);
export const recentNewsSelector = createSelector(
  newsReducer,
  (news) => news.recentNews
);
export const relatedNewsSelector = createSelector(
  newsReducer,
  (news) => news.relatedNews
);
export const recentNewsPaginationSelector = createSelector(
  newsReducer,
  (news) => news.recentNews.pagination
);
