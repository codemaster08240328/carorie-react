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

import { getItem, removeItem } from 'utils/localStorage'

const auth = getItem('auth')

const initialState = {
  loggedInUser: auth ? JSON.parse(auth).user : null,
  status: null,
  error: null,
}

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loggedInUser: null,
        status: type,
        error: null,
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedInUser: payload,
        status: type,
        error: null,
      }

    case LOGIN_FAIL:
      return {
        ...state,
        loggedInUser: null,
        status: type,
        error: payload,
      }

    case LOGOUT:
      removeItem('auth')
      
      return {
        ...state,
        loggedInUser: null,
        status: null,
        error: null,
      }

    case REGISTER_REQUEST:
      return {
        ...state,
        loggedInUser: null,
        status: type,
        error: null,
      }

    case REGISTER_SUCCESS:
      return {
        ...state,
        loggedInUser: null,
        status: type,
        error: null,
      }

    case REGISTER_FAIL:
      return {
        ...state,
        loggedInUser: null,
        status: type,
        error: payload,
      }

    case PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        status: type,
        error: null,
      }

    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        loggedInUser: payload,
        status: type,
        error: null,
      }

    case PROFILE_UPDATE_FAIL:
      return {
        ...state,
        status: type,
        error: null,
      }

    case PROFILE_GET_REQUEST:
      return {
        ...state,
        status: type,
        error: null,
      }

    case PROFILE_GET_SUCCESS:
      return {
        ...state,
        loggedInUser: payload,
        status: type,
        error: null,
      }

    case PROFILE_GET_FAIL:
      return {
        ...state,
        status: type,
        error: payload,
      }

    case INITIALIZE_STATUS:
      return {
        ...state,
        status: null,
        error: null,
      }

    default:
      return state
  }
}
