import { 
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,

  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,

  USER_NEW_REQUEST,
  USER_NEW_SUCCESS,
  USER_NEW_FAIL,

  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,

  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from 'constants/user'

export function userListRequest(payload) {
  return {
    type: USER_LIST_REQUEST,
    payload,
  }
}

export function userListSuccess(payload) {
  return {
    type: USER_LIST_SUCCESS,
    payload,
  }
}

export function userListFail(payload) {
  return {
    type: USER_LIST_FAIL,
    payload,
  }
}

export function userDetailRequest(payload) {
  return {
    type: USER_DETAIL_REQUEST,
    payload,
  }
}

export function userDetailSuccess(payload) {
  return {
    type: USER_DETAIL_SUCCESS,
    payload,
  }
}

export function userDetailFail(payload) {
  return {
    type: USER_DETAIL_FAIL,
    payload,
  }
}

export function userNewRequest(payload) {
  return {
    type: USER_NEW_REQUEST,
    payload,
  }
}

export function userNewSuccess(payload) {
  return {
    type: USER_NEW_SUCCESS,
    payload,
  }
}

export function userNewFail(payload) {
  return {
    type: USER_NEW_FAIL,
    payload,
  }
}

export function userUpdateRequest(payload) {
  return {
    type: USER_UPDATE_REQUEST,
    payload,
  }
}

export function userUpdateSuccess(payload) {
  return {
    type: USER_UPDATE_SUCCESS,
    payload,
  }
}

export function userUpdateFail(payload) {
  return {
    type: USER_UPDATE_FAIL,
    payload,
  }
}

export function userDeleteRequest(payload) {
  return {
    type: USER_DELETE_REQUEST,
    payload,
  }
}

export function userDeleteSuccess(payload) {
  return {
    type: USER_DELETE_SUCCESS,
    payload,
  }
}

export function userDeleteFail(payload) {
  return {
    type: USER_DELETE_FAIL,
    payload,
  }
}
