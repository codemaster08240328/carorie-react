import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import {
  USER_LIST_REQUEST,
  USER_NEW_REQUEST,
  USER_UPDATE_REQUEST,
  USER_DETAIL_REQUEST,
  USER_DELETE_REQUEST,
} from 'constants/user'

import {
  userListRequest,
  userListSuccess,
  userListFail,
  userNewSuccess,
  userNewFail,
  userUpdateSuccess,
  userUpdateFail,
  userDetailSuccess,
  userDetailFail,
  userDeleteSuccess,
  userDeleteFail,
} from 'actions/user'

import { getHeaders, getErrorMessage } from 'utils/authHelper'

axios.defaults.baseURL = process.env.API_URL + '/'

export function* userListRequestHandler({ payload }) {
  const params = {
    url: 'api/users/',
    method: 'get',
    headers: getHeaders(),
    params: payload,
  }

  try {
    const res = yield call(axios.request, params)
    yield put(userListSuccess(res.data))
  } catch (err) {
    yield put(userListFail(getErrorMessage(err.response)))
  }
}

export function* userDetailRequestHandler({ payload }) {
  const params = {
    url: `api/users/${payload}`,
    method: 'get',
    headers: getHeaders(),
  }

  try {
    const res = yield call(axios.request, params)
    yield put(userDetailSuccess(res.data))
  } catch (err) {
    yield put(userDetailFail(getErrorMessage(err.response)))
  }
}

export function* userNewRequestHandler({ payload }) {
  const params = {
    url: `api/users/`,
    method: 'post',
    headers: getHeaders(),
    data: payload,
  }

  try {
    const res = yield call(axios.request, params)
    yield put(userNewSuccess(res.data))
  } catch (err) {
    yield put(userNewFail(getErrorMessage(err.response)))
  }
}

export function* userUpdateRequestHandler({ payload }) {
  const params = {
    url: `api/users/${payload.id}/`,
    method: 'put',
    headers: getHeaders(),
    data: payload,
  }

  try {
    const res = yield call(axios.request, params)
    yield put(userUpdateSuccess(res.data))
  } catch (err) {
    yield put(userUpdateFail(getErrorMessage(err.response)))
  }
}

export function* userDeleteRequestHandler({ payload }) {
  const params = {
    url: `api/users/${payload}/`,
    method: 'delete',
    headers: getHeaders(),
  }

  try {
    yield call(axios.request, params)
    yield put(userDeleteSuccess(payload))
    yield put(userListRequest({ page: 1, page_size: 10 }))
  } catch (err) {
    yield put(userDeleteFail(getErrorMessage(err.response)))
  }
}

export default function* userSaga() {
  yield takeLatest(USER_LIST_REQUEST, userListRequestHandler)
  yield takeLatest(USER_DETAIL_REQUEST, userDetailRequestHandler)
  yield takeLatest(USER_NEW_REQUEST, userNewRequestHandler)
  yield takeLatest(USER_UPDATE_REQUEST, userUpdateRequestHandler)
  yield takeLatest(USER_DELETE_REQUEST, userDeleteRequestHandler)
}
