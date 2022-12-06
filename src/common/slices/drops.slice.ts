import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

// reducer function for adding list to end of droplist
const getReducer = (obj) => {
  const obj2 = { ...obj };
  const reducer = (x, y) => {
    if (x.hasOwnProperty(y)) {
      x[y] = [...x[y], ...obj2[y]];
      return x;
    } else {
      /*  {...x, [y]: obj2[y]} */
      x[y] = obj2[y];
      return x;
    }
  };
  return reducer;
};
export interface DropsList {
  dropsList: Array<Object>;
  loading: boolean;
  singleDrops: object;
  success: string;
  error: object | string;
  pagination: object | string;
}

const initialState: DropsList = {
  dropsList: [{}],
  singleDrops: {
    relatedDrops: [],
  },
  loading: false,
  success: "",
  error: "",
  pagination: {
    page_num: 0,
  },
};

export const newsSlice = createSlice({
  name: "dropsList",
  initialState,
  reducers: {
    fetchDropsStart: (state, action) => {
      return {
        ...state,
        loading: true,
        pagination: {
          ...action.payload,
        },
      };
    },
    fetchDropsSuccess: (state, action) => {
      // const newlist = current(action.payload);
      // const oldlist = current(state.dropsList);
      // const finalist = Object.keys(newlist.drops).reduce(
      //   getReducer(newlist.drops),
      //   oldlist["drops"]
      // );
      return {
        ...state,
        loading: false,
        dropsList: action.payload,
        // dropsList: state.pagination.page_num === 1 ? action.payload : {},
        // : Object.assign({}, state.dropsList, action.payload),
      };
    },
    fetchDropsError: (state, action: PayloadAction<T>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    fetchSingleDropsStart: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    fetchSingleDropsSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        singleDrops: action.payload,
        success: "success",
      };
    },
    fetchSingleDropsError: (state, action: PayloadAction<T>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    fetchRelatedDropsStart: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        loading: true,
      };
    },
    fetchRelatedDropsSuccess: (state, action: PayloadAction<object>) => {
      return {
        ...state,
        loading: false,
        singleDrops: {
          ...state.singleDrops,
          relatedDrops: action.payload,
        },
      };
    },
    fetchRelatedDropsError: (state, action: PayloadAction<object>) => {
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
  fetchDropsStart,
  fetchDropsSuccess,
  fetchDropsError,
  fetchSingleDropsStart,
  fetchSingleDropsSuccess,
  fetchSingleDropsError,
  fetchRelatedDropsStart,
  fetchRelatedDropsSuccess,
  fetchRelatedDropsError,
} = newsSlice.actions;

export default newsSlice.reducer;
