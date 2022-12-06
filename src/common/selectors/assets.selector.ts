import { createSelector } from "@reduxjs/toolkit";

const assetsReducer = (state: State) => state.assets;

export const advertSelector = createSelector(
  assetsReducer,
  (assets) => assets?.advert
);
export const singleAdvertSelector = createSelector(
  assetsReducer,
  (assets) => assets.singleAdvert
);
export const categoriesSelector = createSelector(
  assetsReducer,
  (assets) => assets?.categories
);