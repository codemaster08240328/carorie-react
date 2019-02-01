import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import {
  USER_RECORD_LIST_REQUEST,
  USER_RECORD_NEW_REQUEST,
  USER_RECORD_UPDATE_REQUEST,
  USER_RECORD_DETAIL_REQUEST,
  USER_RECORD_DELETE_REQUEST,
} from 'constants/userRecord'

import {
  userRecordListRequest,
  userRecordListSuccess,
  userRecordListFail,
  userRecordNewSuccess,
  userRecordNewFail,
  userRecordUpdateSuccess,
  userRecordUpdateFail,
  userRecordDetailSuccess,
  userRecordDetailFail,
  userRecordDeleteSuccess,
  userRecordDeleteFail,
} from 'actions/userRecord'

import { getHeaders, getErrorMessage } from 'utils/authHelper'

axios.defaults.baseURL = process.env.API_URL + '/'

export function* userRecordListRequestHandler({ userID, payload }) {
  const params = {
    url: `api/users/${userID}/records/`,
    method: 'get',
    headers: getHeaders(),
    params: payload,
  }

  try {
    const res = yield call(axios.request, params)
    yield put(userRecordListSuccess(res.data))
  } catch (err) {
    yield put(userRecordListFail(getErrorMessage(err.response)))
  }
}

export function* userRecordDetailRequestHandler({ userID, recordID }) {
  const params = {
    url: `api/users/${userID}/records/${recordID}/`,
    method: 'get',
    headers: getHeaders(),
  }

  try {
    const res = yield call(axios.request, params)
    yield put(userRecordDetailSuccess(res.data))
  } catch (err) {
    yield put(userRecordDetailFail(getErrorMessage(err.response)))
  }
}

export function* userRecordNewRequestHandler({userID, payload }) {
  const params = {
    url: `api/users/${userID}/records/`,
    method: 'post',
    headers: getHeaders(),
    data: payload,
  }

  try {
    const res = yield call(axios.request, params)
    yield put(userRecordNewSuccess(res.data))
  } catch (err) {
    yield put(userRecordNewFail(getErrorMessage(err.response)))
  }
}

export function* userRecordUpdateRequestHandler({ userID, recordID, payload }) {
  const params = {
    url: `api/users/${userID}/records/${recordID}/`,
    method: 'put',
    headers: getHeaders(),
    data: payload,
  }

  try {
    const res = yield call(axios.request, params)
    yield put(userRecordUpdateSuccess(res.data))
  } catch (err) {
    yield put(userRecordUpdateFail(getErrorMessage(err.response)))
  }
}

export function* userRecordDeleteRequestHandler({ userID, recordID }) {
  const params = {
    url: `api/users/${userID}/records/${recordID}/`,
    method: 'delete',
    headers: getHeaders(),
  }

  try {
    yield call(axios.request, params)
    yield put(userRecordDeleteSuccess())
    yield put(userRecordListRequest(userID, { page: 1, page_size: 10 }))
  } catch (err) {
    yield put(userRecordDeleteFail(getErrorMessage(err.response)))
  }
}

export default function* userRecordSaga() {
  yield takeLatest(USER_RECORD_LIST_REQUEST, userRecordListRequestHandler)
  yield takeLatest(USER_RECORD_DETAIL_REQUEST, userRecordDetailRequestHandler)
  yield takeLatest(USER_RECORD_NEW_REQUEST, userRecordNewRequestHandler)
  yield takeLatest(USER_RECORD_UPDATE_REQUEST, userRecordUpdateRequestHandler)
  yield takeLatest(USER_RECORD_DELETE_REQUEST, userRecordDeleteRequestHandler)
}
