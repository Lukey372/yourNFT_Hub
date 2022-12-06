import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Advert {
  advert: Array<Object>;
  loading: boolean;
  singleAdvert: object;
  success: string;
  error: object | string;
  featuredAdvert: object | string;
}

const initialState: Advert = {
  advert: {
    advert: [],
  },
  singleAdvert: {
    relatedAdvert: [],
  },
  categories: [],
  loading: false,
  success: "",
  error: "",
};

export const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    fetchAdvertStart: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    fetchAdvertSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        advert: action.payload,
      };
    },
    fetchAdvertError: (state, action: PayloadAction<T>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    fetchSingleAdvertStart: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    fetchSingleAdvertSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        singleAdvert: action.payload,
        success: "success",
      };
    },
    fetchSingleAdvertError: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    fetchCategoriesStart: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    fetchCategoriesSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    },
    fetchCategoriesError: (state, action: PayloadAction<object>) => {
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
  fetchAdvertStart,
  fetchAdvertSuccess,
  fetchAdvertError,
  fetchSingleAdvertStart,
  fetchSingleAdvertSuccess,
  fetchSingleAdvertError,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesError,
} = assetsSlice.actions;

export default assetsSlice.reducer;
