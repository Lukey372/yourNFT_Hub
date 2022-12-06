import { put, takeEvery, all } from "redux-saga/effects";
import { routes } from "../config";
import * as GuidesSlice from "../slices/guides.slice";

import commonService from "../services/common.service";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function* fetchMultipleGuidesSaga(action) {
  const params = {
    method: "get",
    route: `${routes.guides}`,
    headerCred: {
      autherization: "myAuthToken",
    },
  };

  try {
    const res = yield commonService(params);
    yield put(GuidesSlice.fetchGuidesSuccess(res));
  } catch (error) {
    yield put(GuidesSlice.fetchGuidesError(error));
    handleError(error);
  }
}
function* fetchRelatedGuidesSaga(action) {
  const searchparams = new URLSearchParams(action.payload).toString();

  const params = {
    method: "get",
    route: `${routes.guides}?${searchparams}`,
    headerCred: {
      autherization: "myAuthToken",
    },
  };

  try {
    const res = yield commonService(params);
    yield put(GuidesSlice.fetchRelatedGuidesSuccess(res));
  } catch (error) {
    yield put(GuidesSlice.fetchRelatedGuidesError(error));
    handleError(error);
  }
}
function* fetchSingleGuidesSaga(action) {
  const params = {
    method: "get",
    route: `${routes.guides}/${action.payload.id}`,
    headerCred: {
      autherization: "",
    },
  };

  try {
    const res = yield commonService(params);
    // const relatedObject = { category_id: res.category_id, row_per_page: 6 };
    // yield put(GuidesSlice.fetchRelatedGuidesStart(relatedObject));
    yield put(GuidesSlice.fetchSingleGuidesSuccess(res));
  } catch (error) {
    yield put(GuidesSlice.fetchSingleGuidesError(error));
    handleError(error);
  }
}

export function* guidesSaga() {
  yield takeEvery(GuidesSlice.fetchGuidesStart, fetchMultipleGuidesSaga);
  yield takeEvery(GuidesSlice.fetchSingleGuidesStart, fetchSingleGuidesSaga);
  yield takeEvery(GuidesSlice.fetchRelatedGuidesStart, fetchRelatedGuidesSaga);
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
