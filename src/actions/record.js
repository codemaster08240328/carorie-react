import { 
  RECORD_LIST_REQUEST,
  RECORD_LIST_SUCCESS,
  RECORD_LIST_FAIL,

  RECORD_DETAIL_REQUEST,
  RECORD_DETAIL_SUCCESS,
  RECORD_DETAIL_FAIL,

  RECORD_NEW_REQUEST,
  RECORD_NEW_SUCCESS,
  RECORD_NEW_FAIL,

  RECORD_UPDATE_REQUEST,
  RECORD_UPDATE_SUCCESS,
  RECORD_UPDATE_FAIL,

  RECORD_DELETE_REQUEST,
  RECORD_DELETE_SUCCESS,
  RECORD_DELETE_FAIL,

  RECORD_ALL_USER_REQUEST,
  RECORD_ALL_USER_SUCCESS,
  RECORD_ALL_USER_FAIL,
} from 'constants/record'

export function recordListRequest(payload) {
  return {
    type: RECORD_LIST_REQUEST,
    payload,
  }
}

export function recordListSuccess(payload) {
  return {
    type: RECORD_LIST_SUCCESS,
    payload,
  }
}

export function recordListFail(payload) {
  return {
    type: RECORD_LIST_FAIL,
    payload,
  }
}

export function recordDetailRequest(payload) {
  return {
    type: RECORD_DETAIL_REQUEST,
    payload,
  }
}

export function recordDetailSuccess(payload) {
  return {
    type: RECORD_DETAIL_SUCCESS,
    payload,
  }
}

export function recordDetailFail(payload) {
  return {
    type: RECORD_DETAIL_FAIL,
    payload,
  }
}

export function recordNewRequest(payload) {
  return {
    type: RECORD_NEW_REQUEST,
    payload,
  }
}

export function recordNewSuccess(payload) {
  return {
    type: RECORD_NEW_SUCCESS,
    payload,
  }
}

export function recordNewFail(payload) {
  return {
    type: RECORD_NEW_FAIL,
    payload,
  }
}

export function recordUpdateRequest(payload) {
  return {
    type: RECORD_UPDATE_REQUEST,
    payload,
  }
}

export function recordUpdateSuccess(payload) {
  return {
    type: RECORD_UPDATE_SUCCESS,
    payload,
  }
}

export function recordUpdateFail(payload) {
  return {
    type: RECORD_UPDATE_FAIL,
    payload,
  }
}

export function recordDeleteRequest(payload) {
  return {
    type: RECORD_DELETE_REQUEST,
    payload,
  }
}

export function recordDeleteSuccess(payload) {
  return {
    type: RECORD_DELETE_SUCCESS,
    payload,
  }
}

export function recordDeleteFail(payload) {
  return {
    type: RECORD_DELETE_FAIL,
    payload,
  }
}

export function recordAllUserRequest() {
  return {
    type: RECORD_ALL_USER_REQUEST,
  }
}

export function recordAllUserSuccess(payload) {
  return {
    type: RECORD_ALL_USER_SUCCESS,
    payload,
  }
}

export function recordAllUserFail(payload) {
  return {
    type: RECORD_ALL_USER_FAIL,
    payload,
  }
}
