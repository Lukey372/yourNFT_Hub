import { put, takeEvery, all } from "redux-saga/effects";
import { routes } from "../config";
import * as ServicesSlice from "../slices/services.slice";

import commonService from "../services/common.service";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function* fetchMultipleServicesSaga(action) {
  const params = {
    method: "get",
    route: `${routes.services}`,
    headerCred: {
      autherization: "myAuthToken",
    },
  };

  try {
    const res = yield commonService(params);
    yield put(ServicesSlice.fetchFeaturedServicesStart({ is_featured: 1 }));
    yield put(ServicesSlice.fetchServicesSuccess(res));
  } catch (error) {
    yield put(ServicesSlice.fetchServicesError(error));
    handleError(error);
  }
}
function* fetchRelatedServicesSaga(action) {
  const searchparams = new URLSearchParams(action.payload).toString();

  const params = {
    method: "get",
    route: `${routes.services}?${searchparams}`,
    headerCred: {
      autherization: "myAuthToken",
    },
  };

  try {
    const res = yield commonService(params);
    yield put(ServicesSlice.fetchRelatedServicesSuccess(res));
  } catch (error) {
    yield put(ServicesSlice.fetchRelatedServicesError(error));
    handleError(error);
  }
}
function* fetchFeaturedServicesSaga(action) {
  const searchparams = new URLSearchParams(action.payload).toString();

  const params = {
    method: "get",
    route: `${routes.services}?${searchparams}`,
    headerCred: {
      autherization: "myAuthToken",
    },
  };

  try {
    const res = yield commonService(params);
    yield put(ServicesSlice.fetchFeaturedServicesSuccess(res));
  } catch (error) {
    yield put(ServicesSlice.fetchFeaturedServicesError(error));
    handleError(error);
  }
}
function* fetchSingleServicesSaga(action) {
  const params = {
    method: "get",
    route: `${routes.services}/${action.payload.id}`,
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
    yield put(ServicesSlice.fetchRelatedServicesStart(relatedObject));
    yield put(ServicesSlice.fetchSingleServicesSuccess(res));
  } catch (error) {
    yield put(ServicesSlice.fetchSingleServicesError(error));
    handleError(error);
  }
}

export function* servicesSaga() {
  yield takeEvery(ServicesSlice.fetchServicesStart, fetchMultipleServicesSaga);
  yield takeEvery(
    ServicesSlice.fetchSingleServicesStart,
    fetchSingleServicesSaga
  );
  yield takeEvery(
    ServicesSlice.fetchRelatedServicesStart,
    fetchRelatedServicesSaga
  );
  yield takeEvery(
    ServicesSlice.fetchFeaturedServicesStart,
    fetchFeaturedServicesSaga
  );
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
