import { put, takeEvery, takeLatest, all } from "redux-saga/effects";
import { routes } from "../config";
import * as NewsSlice from "../slices/news.slice";

import commonService from "../services/common.service";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function* fetchMultipleNewsSaga(action) {
  const searchparams = new URLSearchParams(action.payload).toString();
  const params = {
    method: "get",
    route: `${routes.news}?${searchparams}`,
    headerCred: {
      autherization: "myAuthToken",
    },
  };

  try {
    const res = yield commonService(params);
    yield put(NewsSlice.fetchFeaturedNewsStart({ is_featured: 1 }));
    yield put(NewsSlice.fetchNewsSuccess(res));
  } catch (error) {
    yield put(NewsSlice.fetchNewsError(error));
    handleError(error);
  }
}

function* fetchRelatedNewsSaga(action) {
  const searchparams = new URLSearchParams(action.payload).toString();

  const params = {
    method: "get",
    route: `${routes.news}?${searchparams}`,
    headerCred: {
      autherization: "myAuthToken",
    },
  };

  try {
    const res = yield commonService(params);
    yield put(NewsSlice.fetchRelatedNewsSuccess(res));
  } catch (error) {
    yield put(NewsSlice.fetchRelatedNewsError(error));
    handleError(error);
  }
}
function* fetchRecentNewsSaga(action) {
  const rawParams = {
    ...action.payload,
    is_recent: 1,
  };
  const searchparams = new URLSearchParams(rawParams).toString();

  const params = {
    method: "get",
    route: `${routes.news}?${searchparams}`,
    headerCred: {
      autherization: "myAuthToken",
    },
  };

  try {
    const res = yield commonService(params);
    yield put(NewsSlice.fetchRecentNewsSuccess(res));
  } catch (error) {
    yield put(NewsSlice.fetchRecentNewsError(error));
    handleError(error);
  }
}
function* fetchFeaturedNewsSaga(action) {
  const searchparams = new URLSearchParams(action.payload).toString();

  const params = {
    method: "get",
    route: `${routes.news}?${searchparams}`,
    headerCred: {
      autherization: "myAuthToken",
    },
  };

  try {
    const res = yield commonService(params);
    yield put(NewsSlice.fetchFeaturedNewsSuccess(res));
  } catch (error) {
    yield put(NewsSlice.fetchFeaturedNewsError(error));
    handleError(error);
  }
}
function* fetchSingleNewsSaga(action) {
  const params = {
    method: "get",
    route: `${routes.news}/${action.payload.id}`,
    headerCred: {
      autherization: "",
    },
  };

  try {
    const res = yield commonService(params);
    const relatedObject = {
      category_id: res.current.category_id,
      row_per_page: 6,
    };
    yield put(NewsSlice.fetchRelatedNewsStart(relatedObject));
    yield put(NewsSlice.fetchSingleNewsSuccess(res));
  } catch (error) {
    yield put(NewsSlice.fetchSingleNewsError(error));
    handleError(error);
  }
}

export function* newsSaga() {
  yield takeEvery(NewsSlice.fetchNewsStart, fetchMultipleNewsSaga);
  yield takeEvery(NewsSlice.fetchSingleNewsStart, fetchSingleNewsSaga);
  yield takeEvery(NewsSlice.fetchRelatedNewsStart, fetchRelatedNewsSaga);
  yield takeLatest(NewsSlice.fetchRecentNewsStart, fetchRecentNewsSaga);
  yield takeLatest(NewsSlice.fetchFeaturedNewsStart, fetchFeaturedNewsSaga);
}

//
//
// axios error handling
function handleError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
  } else {
    // Something happened in setting up the request that triggered an Error
  }
}
