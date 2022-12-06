import { createSelector } from "@reduxjs/toolkit";

const dropsReducer = (state: State) => state.drops;

export const dropsListSelector = createSelector(
  dropsReducer,
  (drops) => drops.dropsList.drops
);
export const singleDropsSelector = createSelector(
  dropsReducer,
  (drops) => drops.singleDrops
);
export const dropsPaginationSelector = createSelector(
  dropsReducer,
  (drops) => drops.pagination
);
export const dropsLoadingSelector = createSelector(
  dropsReducer,
  (drops) => drops.loading
);
