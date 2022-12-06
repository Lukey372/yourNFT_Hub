import { createSelector } from "@reduxjs/toolkit";

const guidesReducer = (state: State) => state.guides;

export const guidesListSelector = createSelector(
  guidesReducer,
  (guides) => guides.guidesList
);
export const guidesLoadingSelector = createSelector(
  guidesReducer,
  (guides) => guides.loading
);
export const singleGuidesSelector = createSelector(
  guidesReducer,
  (guides) => guides.singleGuides
);
export const featuredGuidesSelector = createSelector(
  guidesReducer,
  (guides) => guides.featuredGuides
);
