import { omit, reject } from 'lodash'

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

const initialState = {
  records: null,
  record: null,
  status: null,
  error: null,
  params: {
    date_from: null,
    date_to: null,
    time_from: null,
    time_to: null,
    page: 1,
    page_size: 5,
    count: 0,
  },
}

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case USER_RECORD_LIST_REQUEST:
      return {
        ...state,
        params: {
          ...state.params,
          ...payload,
        },
        records: null,
        status: type,
        error: null,
      }

    case USER_RECORD_LIST_SUCCESS:
      return {
        ...state,
        records: payload.results,
        params: {
          ...state.params,
          ...omit(payload, 'results', 'next', 'previous'),
        },
        status: type,
        error: null,
      }

    case USER_RECORD_LIST_FAIL:
      return {
        ...state,
        records: null,
        status: type,
        error: payload,
      }

    case USER_RECORD_NEW_REQUEST:
      return {
        ...state,
        status: type,
        error: null,
      }

    case USER_RECORD_NEW_SUCCESS:
      return {
        ...state,
        status: type,
        error: null,
      }

    case USER_RECORD_NEW_FAIL:
      return {
        ...state,
        status: type,
        error: payload
      }

    case USER_RECORD_DETAIL_REQUEST:
      return {
        ...state,
        record: null,
        status: type,
        error: null,
      }

    case USER_RECORD_DETAIL_SUCCESS:
      return {
        ...state,
        record: payload,
        status: type,
        error: null,
      }

    case USER_RECORD_DETAIL_FAIL:
      return {
        ...state,
        record: null,
        status: type,
        error: payload,
      }

    case USER_RECORD_UPDATE_REQUEST:
      return {
        ...state,
        status: type,
        error: null,
      }

    case USER_RECORD_UPDATE_SUCCESS:
      return {
        ...state,
        record: payload,
        status: type,
        error: null,
      }

    case USER_RECORD_UPDATE_FAIL:
      return {
        ...state,
        status: type,
        error: payload,
      }

    case USER_RECORD_DELETE_REQUEST:
      return {
        ...state,
        status: type,
        error: null,
      }

    case USER_RECORD_DELETE_SUCCESS:
      return {
        ...state,
        records: reject(state.records, { id: payload }),
        status: type,
        error: null,
      }

    case USER_RECORD_DELETE_FAIL:
      return {
        ...state,
        status: type,
        error: payload,
      }

    default:
      return state
  }
}
