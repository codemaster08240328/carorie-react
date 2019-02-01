import { call, put, takeLatest } from 'redux-saga/effects'

import { 
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  PROFILE_UPDATE_REQUEST,
  PROFILE_GET_REQUEST,
} from 'constants/auth'
import { 
  loginRequest,
  loginSuccess,
  loginFail,
  registerSuccess,
  registerFail,
  profileUpdateSuccess,
  profileUpdateFail,
  profileGetSuccess,
  profileGetFail,
} from 'actions/auth'
import axios from 'axios'
import { getHeaders, getErrorMessage } from 'utils/authHelper'
import { setItem, getItem } from 'utils/localStorage'

axios.defaults.baseURL = process.env.API_URL + '/'

export function* loginRequestHandler({ payload }) {
  const params = {
    url: 'api/login/',
    method: 'post',
    headers: getHeaders(),
    data: payload,
  }
  try {
    const res = yield call(axios.request, params)
    yield call(setItem, 'auth', JSON.stringify(res.data))
    yield put(loginSuccess(res.data.user))
  } catch (err) {
    yield put(loginFail('Invalid Username or Password'))
  }
}

export function* registerRequestHandler({ payload }) {
  const params = {
    url: 'api/register/',
    method: 'post',
    headers: getHeaders(),
    data: payload,
  }

  try {
    const res = yield call(axios.request, params)
    yield put(registerSuccess(res))
    yield put(loginRequest(payload))
  } catch (err) {
    yield put(registerFail(getErrorMessage(err.response)))
  }
}

export function* updateProfileRequestHandler({ payload }) {
  const params = {
    url: 'api/users/profile/',
    method: 'put',
    headers: getHeaders(),
    data: payload,
  }

  let auth = JSON.parse(yield call(getItem, 'auth'))
  
  try {
    const res = yield call(axios.request, params)
    auth.user = res.data
    yield call(setItem, 'auth', JSON.stringify(auth))
    yield put(profileUpdateSuccess(res.data))
  } catch (err) {
    yield put(profileUpdateFail(getErrorMessage(err.response)))
  }
}

export function* profileGetRequestHandler() {
  const params = {
    url: 'api/users/profile/',
    method: 'get',
    headers: getHeaders(),
  }

  let auth = JSON.parse(yield call(getItem, 'auth'))
  
  try {
    const res = yield call(axios.request, params)
    auth.user = res.data
    yield call(setItem, 'auth', JSON.stringify(auth))
    yield put(profileGetSuccess(res.data))
  } catch (err) {
    yield put(profileGetFail(getErrorMessage(err.response)))
  }
}

export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginRequestHandler)
  yield takeLatest(REGISTER_REQUEST, registerRequestHandler)
  yield takeLatest(PROFILE_UPDATE_REQUEST, updateProfileRequestHandler)
  yield takeLatest(PROFILE_GET_REQUEST, profileGetRequestHandler)
}
