import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ServicesList {
  servicesList: Array<Object>;
  loading: boolean;
  singleServices: object;
  success: string;
  error: object | string;
  featuredServices: object | string;
}

const initialState: ServicesList = {
  servicesList: [{}],
  singleServices: {
    relatedServices: [],
  },
  featuredServices: [{}],
  loading: false,
  success: "",
  error: "",
};

export const servicesSlice = createSlice({
  name: "servicesList",
  initialState,
  reducers: {
    fetchServicesStart: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    fetchServicesSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        servicesList: action.payload,
      };
    },
    fetchServicesError: (state, action: PayloadAction<T>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    fetchSingleServicesStart: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    fetchSingleServicesSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        singleServices: action.payload,
        success: "success",
      };
    },
    fetchSingleServicesError: (state, action: PayloadAction<T>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    // Not using for now
    //
    fetchRelatedServicesStart: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        loading: true,
      };
    },
    fetchRelatedServicesSuccess: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        loading: false,
        singleServices: {
          ...state.singleServices,
          relatedServices: action.payload,
        },
      };
    },
    fetchRelatedServicesError: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    fetchFeaturedServicesStart: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        loading: true,
      };
    },
    fetchFeaturedServicesSuccess: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        loading: false,
        featuredServices: action.payload,
      };
    },
    fetchFeaturedServicesError: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchServicesStart,
  fetchServicesSuccess,
  fetchServicesError,
  fetchSingleServicesStart,
  fetchSingleServicesSuccess,
  fetchSingleServicesError,
  fetchRelatedServicesStart,
  fetchRelatedServicesSuccess,
  fetchRelatedServicesError,
  fetchFeaturedServicesStart,
  fetchFeaturedServicesSuccess,
  fetchFeaturedServicesError,
} = servicesSlice.actions;

export default servicesSlice.reducer;
