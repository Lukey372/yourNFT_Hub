import { put, takeEvery, all } from "redux-saga/effects";
import { routes } from "../config";
import * as AssetsSlice from "../slices/assets.slice";

import commonService from "../services/common.service";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function* fetchMultipleAdvertSaga(action) {
  const params = {
    method: "get",
    route: `${routes.advert}`,
    headerCred: {
      autherization: "myAuthToken",
    },
  };

  try {
    const res = yield commonService(params);
    yield put(AssetsSlice.fetchFeaturedAdvertStart({ is_featured: 1 }));
    yield put(AssetsSlice.fetchAdvertSuccess(res));
  } catch (error) {
    yield put(AssetsSlice.fetchAdvertError(error));
    handleError(error);
  }
}
function* fetchAdvertiseSaga(action) {
  const searchparams = new URLSearchParams(action.payload).toString();
  const params = {
    method: "get",
    route: routes.advert,
    headerCred: {
      autherization: "myAuthToken",
    },
  };

  try {
    const res = yield commonService(params);
    yield put(AssetsSlice.fetchAdvertSuccess(res));
  } catch (error) {
    yield put(AssetsSlice.fetchAdvertError(error));
    handleError(error);
  }
}
function* fetchCategoriesSaga(action) {
  const searchparams = new URLSearchParams(action.payload).toString();
  const params = {
    method: "get",
    route: routes.category,
    headerCred: {
      autherization: "myAuthToken",
    },
  };

  try {
    const res = yield commonService(params);
    yield put(AssetsSlice.fetchCategoriesSuccess(res));
  } catch (error) {
    yield put(AssetsSlice.fetchCategoriesError(error));
    handleError(error);
  }
}

export function* assetsSaga() {
  yield takeEvery(AssetsSlice.fetchAdvertStart, fetchAdvertiseSaga);
  yield takeEvery(AssetsSlice.fetchCategoriesStart, fetchCategoriesSaga);
  // yield takeEvery(AdvertSlice.fetchSingleAdvertStart, fetchSingleAdvertSaga);
  // yield takeEvery(AdvertSlice.fetchRelatedAdvertStart, fetchRelatedAdvertSaga);
  // yield takeEvery(AdvertSlice.fetchFeaturedAdvertStart, fetchFeaturedAdvertSaga);
}

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
