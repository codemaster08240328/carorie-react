import { 
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,

  LOGOUT,

  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,

  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,

  PROFILE_GET_REQUEST,
  PROFILE_GET_SUCCESS,
  PROFILE_GET_FAIL,

  INITIALIZE_STATUS,
} from 'constants/auth'

export function loginRequest(payload) {
  return {
    type: LOGIN_REQUEST,
    payload,
  }
}

export function loginSuccess(payload) {
  return {
    type: LOGIN_SUCCESS,
    payload,
  }
}

export function loginFail(payload) {
  return {
    type: LOGIN_FAIL,
    payload,
  }
}

export function logOut() {
  return {
    type: LOGOUT
  }
}

export function registerRequest(payload) {
  return {
    type: REGISTER_REQUEST,
    payload,
  }
}

export function registerSuccess(payload) {
  return {
    type: REGISTER_SUCCESS,
    payload,
  }
}

export function registerFail(payload) {
  return {
    type: REGISTER_FAIL,
    payload,
  }
}

export function profileUpdateRequest(payload) {
  return {
    type: PROFILE_UPDATE_REQUEST,
    payload,
  }
}

export function profileUpdateSuccess(payload) {
  return {
    type: PROFILE_UPDATE_SUCCESS,
    payload,
  }
}

export function profileUpdateFail(payload) {
  return {
    type: PROFILE_UPDATE_FAIL,
    payload,
  }
}

export function profileGetRequest() {
  return {
    type: PROFILE_GET_REQUEST,
  }
}

export function profileGetSuccess(payload) {
  return {
    type: PROFILE_GET_SUCCESS,
    payload,
  }
}

export function profileGetFail(payload) {
  return {
    type: PROFILE_GET_FAIL,
    payload,
  }
}

export function initializeStatus() {
  return {
    type: INITIALIZE_STATUS,
  }
}
