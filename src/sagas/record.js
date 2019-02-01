import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import {
  RECORD_LIST_REQUEST,
  RECORD_NEW_REQUEST,
  RECORD_UPDATE_REQUEST,
  RECORD_DETAIL_REQUEST,
  RECORD_DELETE_REQUEST,
  RECORD_ALL_USER_REQUEST,
} from 'constants/record'

import {
  recordListRequest,
  recordListSuccess,
  recordListFail,
  recordNewSuccess,
  recordNewFail,
  recordUpdateSuccess,
  recordUpdateFail,
  recordDetailSuccess,
  recordDetailFail,
  recordDeleteSuccess,
  recordDeleteFail,
  recordAllUserSuccess,
  recordAllUserFail,
} from 'actions/record'

import { getHeaders, getErrorMessage } from 'utils/authHelper'

axios.defaults.baseURL = process.env.API_URL + '/'

export function* recordListRequestHandler({ payload }) {
  const params = {
    url: 'api/records/',
    method: 'get',
    headers: getHeaders(),
    params: payload,
  }

  try {
    const res = yield call(axios.request, params)
    yield put(recordListSuccess(res.data))
  } catch (err) {
    yield put(recordListFail(getErrorMessage(err.response)))
  }
}

export function* recordDetailRequestHandler({ payload }) {
  const params = {
    url: `api/records/${payload}/`,
    method: 'get',
    headers: getHeaders(),
  }

  try {
    const res = yield call(axios.request, params)
    yield put(recordDetailSuccess(res.data))
  } catch (err) {
    yield put(recordDetailFail(getErrorMessage(err.response)))
  }
}

export function* recordNewRequestHandler({ payload }) {
  const params = {
    url: `api/records/`,
    method: 'post',
    headers: getHeaders(),
    data: payload,
  }

  try {
    const res = yield call(axios.request, params)
    yield put(recordNewSuccess(res.data))
  } catch (err) {
    yield put(recordNewFail(getErrorMessage(err.response)))
  }
}

export function* recordUpdateRequestHandler({ payload }) {
  const params = {
    url: `api/records/${payload.id}/`,
    method: 'put',
    headers: getHeaders(),
    data: payload,
  }

  try {
    const res = yield call(axios.request, params)
    yield put(recordUpdateSuccess(res.data))
  } catch (err) {
    yield put(recordUpdateFail(getErrorMessage(err.response)))
  }
}

export function* recordDeleteRequestHandler({ payload }) {
  const params = {
    url: `api/records/${payload}/`,
    method: 'delete',
    headers: getHeaders(),
  }

  try {
    yield call(axios.request, params)
    yield put(recordDeleteSuccess(payload))
    yield put(recordListRequest({ page: 1, page_size: 10 }))
  } catch (err) {
    yield put(recordDeleteFail(getErrorMessage(err.response)))
  }
}

export function* recordAllUserRequest() {
  const params = {
    url: 'api/users/all/',
    method: 'get',
    headers: getHeaders(),
  }

  try {
    const res = yield call(axios.request, params)
    yield put(recordAllUserSuccess(res.data))
  } catch (err) {
    yield put(recordAllUserFail(getErrorMessage(err.response)))
  }
}

export default function* recordSaga() {
  yield takeLatest(RECORD_LIST_REQUEST, recordListRequestHandler)
  yield takeLatest(RECORD_DETAIL_REQUEST, recordDetailRequestHandler)
  yield takeLatest(RECORD_NEW_REQUEST, recordNewRequestHandler)
  yield takeLatest(RECORD_UPDATE_REQUEST, recordUpdateRequestHandler)
  yield takeLatest(RECORD_DELETE_REQUEST, recordDeleteRequestHandler)
  yield takeLatest(RECORD_ALL_USER_REQUEST, recordAllUserRequest)
}
