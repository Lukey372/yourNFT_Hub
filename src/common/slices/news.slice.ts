import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NewsList {
  newsList: Array<Object>;
  loading: boolean;
  singleNews: object;

  recentNews: {
    recentNewsList: Array<Object>;
    pagination: Object;
  };
  success: string;
  error: object | string;
  featuredNews: object | string;
  relatedNews: {
    relatedNewsList: {
      rows: Array<object>;
    };
    pagination: object;
  };
}

const initialState: NewsList = {
  newsList: [{}],
  singleNews: {},
  relatedNews: {
    relatedNewsList: {
      rows: [],
    },
    pagination: {},
  },
  recentNews: {
    recentNewsList: [],
    pagination: {},
  },
  featuredNews: {
    rows: [],
  },
  loading: false,
  success: "",
  error: "",
};

export const newsSlice = createSlice({
  name: "newsList",
  initialState,
  reducers: {
    fetchNewsStart: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    fetchNewsSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        newsList: action.payload,
      };
    },
    fetchNewsError: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    fetchSingleNewsStart: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    fetchSingleNewsSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        singleNews: action.payload,
        success: "success",
      };
    },
    fetchSingleNewsError: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    fetchRelatedNewsStart: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        loading: true,
      };
    },
    fetchRelatedNewsSuccess: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        loading: false,
        relatedNews: {
          ...state.relatedNews,
          relatedNewsList: action.payload,
        },
      };
    },
    fetchRelatedNewsError: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    fetchRecentNewsStart: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        loading: true,
        recentNews: {
          ...state.recentNews,
          pagination: {
            ...action.payload,
          },
        },
      };
    },
    fetchRecentNewsSuccess: (state, action: PayloadAction<Array<object>>) => {
      return {
        ...state,
        loading: false,
        recentNews: {
          ...state.recentNews,
          recentNewsList: action.payload,
        },
      };
    },
    fetchRecentNewsError: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    fetchFeaturedNewsStart: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        loading: true,
      };
    },
    fetchFeaturedNewsSuccess: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        loading: false,
        featuredNews: action.payload,
      };
    },
    fetchFeaturedNewsError: (state, action: PayloadAction<object>) => {
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
  fetchNewsStart,
  fetchNewsSuccess,
  fetchNewsError,
  fetchSingleNewsStart,
  fetchSingleNewsSuccess,
  fetchSingleNewsError,
  fetchRelatedNewsStart,
  fetchRelatedNewsSuccess,
  fetchRelatedNewsError,
  fetchRecentNewsStart,
  fetchRecentNewsSuccess,
  fetchRecentNewsError,
  fetchFeaturedNewsStart,
  fetchFeaturedNewsSuccess,
  fetchFeaturedNewsError,
} = newsSlice.actions;

export default newsSlice.reducer;
