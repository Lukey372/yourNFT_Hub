import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GuidesList {
  guidesList: Array<Object>;
  loading: boolean;
  singleGuides: object;
  success: string;
  error: object | string;
  featuredGuides: object | string;
}

const initialState: GuidesList = {
  guidesList: [{}],
  singleGuides: {
    relatedGuides: [],
  },
  featuredGuides: [{}],
  loading: false,
  success: "",
  error: "",
};

export const guidesSlice = createSlice({
  name: "guidesList",
  initialState,
  reducers: {
    fetchGuidesStart: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    fetchGuidesSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        guidesList: action.payload,
      };
    },
    fetchGuidesError: (state, action: PayloadAction<T>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    fetchSingleGuidesStart: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    fetchSingleGuidesSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        singleGuides: action.payload,
        success: "success",
      };
    },
    fetchSingleGuidesError: (state, action: PayloadAction<T>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    fetchRelatedGuidesStart: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        loading: true,
      };
    },
    fetchRelatedGuidesSuccess: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        loading: false,
        singleGuides: {
          ...state.singleGuides,
          relatedGuides: action.payload,
        },
      };
    },
    fetchRelatedGuidesError: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    fetchFeaturedGuidesStart: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        loading: true,
      };
    },
    fetchFeaturedGuidesSuccess: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        loading: false,
        featuredGuides: action.payload,
      };
    },
    fetchFeaturedGuidesError: (state, action: PayloadAction<object>) => {
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
  fetchGuidesStart,
  fetchGuidesSuccess,
  fetchGuidesError,
  fetchSingleGuidesStart,
  fetchSingleGuidesSuccess,
  fetchSingleGuidesError,
  fetchRelatedGuidesStart,
  fetchRelatedGuidesSuccess,
  fetchRelatedGuidesError,

  fetchFeaturedGuidesStart,
  fetchFeaturedGuidesSuccess,
  fetchFeaturedGuidesError,
} = guidesSlice.actions;

export default guidesSlice.reducer;
