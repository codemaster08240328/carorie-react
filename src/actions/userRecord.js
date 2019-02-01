import { 
  USER_RECORD_LIST_REQUEST,
  USER_RECORD_LIST_SUCCESS,
  USER_RECORD_LIST_FAIL,

  USER_RECORD_DETAIL_REQUEST,
  USER_RECORD_DETAIL_SUCCESS,
  USER_RECORD_DETAIL_FAIL,

  USER_RECORD_NEW_REQUEST,
  USER_RECORD_NEW_SUCCESS,
  USER_RECORD_NEW_FAIL,

  USER_RECORD_UPDATE_REQUEST,
  USER_RECORD_UPDATE_SUCCESS,
  USER_RECORD_UPDATE_FAIL,

  USER_RECORD_DELETE_REQUEST,
  USER_RECORD_DELETE_SUCCESS,
  USER_RECORD_DELETE_FAIL,
} from 'constants/userRecord'

export function userRecordListRequest(userID, payload) {
  return {
    type: USER_RECORD_LIST_REQUEST,
    userID, 
    payload,
  }
}

export function userRecordListSuccess(payload) {
  return {
    type: USER_RECORD_LIST_SUCCESS,
    payload,
  }
}

export function userRecordListFail(payload) {
  return {
    type: USER_RECORD_LIST_FAIL,
    payload,
  }
}

export function userRecordDetailRequest(userID, recordID) {
  return {
    type: USER_RECORD_DETAIL_REQUEST,
    userID,
    recordID,
  }
}

export function userRecordDetailSuccess(payload) {
  return {
    type: USER_RECORD_DETAIL_SUCCESS,
    payload,
  }
}

export function userRecordDetailFail(payload) {
  return {
    type: USER_RECORD_DETAIL_FAIL,
    payload,
  }
}

export function userRecordNewRequest(userID, payload) {
  return {
    type: USER_RECORD_NEW_REQUEST,
    userID,
    payload,
  }
}

export function userRecordNewSuccess(payload) {
  return {
    type: USER_RECORD_NEW_SUCCESS,
    payload,
  }
}

export function userRecordNewFail(payload) {
  return {
    type: USER_RECORD_NEW_FAIL,
    payload,
  }
}

export function userRecordUpdateRequest(userID, recordID, payload) {
  return {
    type: USER_RECORD_UPDATE_REQUEST,
    userID,
    recordID,
    payload,
  }
}

export function userRecordUpdateSuccess(payload) {
  return {
    type: USER_RECORD_UPDATE_SUCCESS,
    payload,
  }
}

export function userRecordUpdateFail(payload) {
  return {
    type: USER_RECORD_UPDATE_FAIL,
    payload,
  }
}

export function userRecordDeleteRequest(userID, recordID) {
  return {
    type: USER_RECORD_DELETE_REQUEST,
    userID,
    recordID,
  }
}

export function userRecordDeleteSuccess(payload) {
  return {
    type: USER_RECORD_DELETE_SUCCESS,
    payload,
  }
}

export function userRecordDeleteFail(payload) {
  return {
    type: USER_RECORD_DELETE_FAIL,
    payload,
  }
}
