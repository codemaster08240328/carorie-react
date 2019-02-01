import { omit, reject } from 'lodash'

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
  users: null,
}

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case RECORD_LIST_REQUEST:
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

    case RECORD_LIST_SUCCESS:
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

    case RECORD_LIST_FAIL:
      return {
        ...state,
        records: null,
        status: type,
        error: payload,
      }

    case RECORD_NEW_REQUEST:
      return {
        ...state,
        status: type,
        error: null,
      }

    case RECORD_NEW_SUCCESS:
      return {
        ...state,
        status: type,
        error: null,
      }

    case RECORD_NEW_FAIL:
      return {
        ...state,
        status: type,
        error: payload
      }

    case RECORD_DETAIL_REQUEST:
      return {
        ...state,
        record: null,
        status: type,
        error: null,
      }

    case RECORD_DETAIL_SUCCESS:
      return {
        ...state,
        record: payload,
        status: type,
        error: null,
      }

    case RECORD_DETAIL_FAIL:
      return {
        ...state,
        record: null,
        status: type,
        error: payload,
      }

    case RECORD_UPDATE_REQUEST:
      return {
        ...state,
        status: type,
        error: null,
      }

    case RECORD_UPDATE_SUCCESS:
      return {
        ...state,
        record: payload,
        status: type,
        error: null,
      }

    case RECORD_UPDATE_FAIL:
      return {
        ...state,
        status: type,
        error: payload,
      }

    case RECORD_DELETE_REQUEST:
      return {
        ...state,
        status: type,
        error: null,
      }

    case RECORD_DELETE_SUCCESS:
      return {
        ...state,
        records: reject(state.records, { id: payload }),
        status: type,
        error: null,
      }

    case RECORD_DELETE_FAIL:
      return {
        ...state,
        status: type,
        error: payload,
      }

    case RECORD_ALL_USER_REQUEST:
      return {
        ...state,
        users: null,
        status: type,
        error: null,
      }

    case RECORD_ALL_USER_SUCCESS:
      return {
        ...state,
        users: payload,
        status: type,
        error: null,
      }

    case RECORD_ALL_USER_FAIL:
      return {
        ...state,
        users: null,
        status: type,
        error: payload,
      }

    default:
      return state
  }
}
