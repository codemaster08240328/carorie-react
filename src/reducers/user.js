import { omit, reject } from 'lodash'

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

const initialState = {
  users: null,
  user: null,
  status: null,
  error: null,
  params: {
    page: 1,
    page_size: 10,
    count: 0,
  },
}

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case USER_LIST_REQUEST:
      return {
        ...state,
        params: {
          ...state.params,
          ...payload,
        },
        users: null,
        status: type,
        error: null,
      }

    case USER_LIST_SUCCESS:
      return {
        ...state,
        users: payload.results,
        params: {
          ...state.params,
          ...omit(payload, 'results', 'next', 'previous'),
        },
        status: type,
        error: null,
      }

    case USER_LIST_FAIL:
      return {
        ...state,
        users: null,
        status: type,
        error: payload,
      }

    case USER_NEW_REQUEST:
      return {
        ...state,
        status: type,
        error: null,
      }

    case USER_NEW_SUCCESS:
      return {
        ...state,
        status: type,
        error: null,
      }

    case USER_NEW_FAIL:
      return {
        ...state,
        status: type,
        error: payload
      }

    case USER_DETAIL_REQUEST:
      return {
        ...state,
        user: null,
        status: type,
        error: null,
      }

    case USER_DETAIL_SUCCESS:
      return {
        ...state,
        user: payload,
        status: type,
        error: null,
      }

    case USER_DETAIL_FAIL:
      return {
        ...state,
        user: null,
        status: type,
        error: payload,
      }

    case USER_UPDATE_REQUEST:
      return {
        ...state,
        status: type,
        error: null,
      }

    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        user: payload,
        status: type,
        error: null,
      }

    case USER_UPDATE_FAIL:
      return {
        ...state,
        status: type,
        error: payload,
      }

    case USER_DELETE_REQUEST:
      return {
        ...state,
        status: type,
        error: null,
      }

    case USER_DELETE_SUCCESS:
      return {
        ...state,
        params: {
          ...state.params,
          count: Math.max(state.params.count-1, 1),
        },
        users: reject(state.users, { id: payload }),
        status: type,
        error: null,
      }

    case USER_DELETE_FAIL:
      return {
        ...state,
        status: type,
        error: payload,
      }

    default:
      return state
  }
}
