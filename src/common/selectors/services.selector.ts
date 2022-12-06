import { createSelector } from "@reduxjs/toolkit";

const servicesReducer = (state: State) => state.services;

export const servicesListSelector = createSelector(
  servicesReducer,
  (services) => services.servicesList
);
export const singleServicesSelector = createSelector(
  servicesReducer,
  (services) => services.singleServices
);
export const servicesLoadingSelector = createSelector(
  servicesReducer,
  (services) => services.loading
);
export const featuredServicesSelector = createSelector(
  servicesReducer,
  (services) => services.featuredServices
);
