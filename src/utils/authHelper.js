import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import { get } from 'lodash'
import { getItem } from 'utils/localStorage'
import { LOGIN_REQUEST } from 'constants/auth'
import { isAdminOrManager, isAdminOrUser, isAdmin } from 'utils/roleHelper'

export const getHeaders = () => {
  const auth = getItem('auth')
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  if (auth) {
    const token = JSON.parse(auth).token
    headers['Authorization'] = 'JWT ' + token
  }

  return headers
}

export const getErrorMessage = error => {
  const data = get(error, 'data', null)
  if (data) {
    let message
    for (let key in data) {
      message = data[key].toString()
      message = message.replace('This field', key)
      message = message.replace('this value', key)
    }
    message = message.charAt(0).toUpperCase() + message.slice(1)
    return message
  }
  return ''
}

const locationHelper = locationHelperBuilder({})

const userIsAuthenticatedDefaults = {
  authenticatedSelector: state => state.auth.loggedInUser !== null,
  authenticatingSelector: state => state.auth.status === LOGIN_REQUEST,
  wrapperDisplayName: 'UserIsAuthenticated'
}

export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  allowRedirectBack: false,
  redirectPath: '/login',
})

export const userIsAdminOrManagerRedir = connectedRouterRedirect({
  redirectPath: '/dashboard',
  allowRedirectBack: false,
  authenticatedSelector: state => 
    state.auth.loggedInUser && isAdminOrManager(state.auth.loggedInUser),
  predicate: user => isAdminOrManager(user),
  wrapperDisplayName: 'UserIsAdminOrManager',
})

export const userIsAdminOrUserRedir = connectedRouterRedirect({
  redirectPath: '/dashboard',
  allowRedirectBack: false,
  authenticatedSelector: state => 
    state.auth.loggedInUser && isAdminOrUser(state.auth.loggedInUser),
  predicate: user => isAdminOrUser(user),
  wrapperDisplayName: 'UserIsAdminOrRegular',
})

export const userIsAdminRedir = connectedRouterRedirect({
  redirectPath: '/dashboard',
  allowRedirectBack: false,
  authenticatedSelector: state => 
    state.auth.loggedInUser && isAdmin(state.auth.loggedInUser),
  predicate: user => isAdmin(user),
  wrapperDisplayName: 'UserIsAdmin',
})

const userIsNotAuthenticatedDefaults = {
  authenticatedSelector: state => !state.auth.loggedInUser,
  wrapperDisplayName: 'UserIsNotAuthenticated',
}

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/dashboard',
  allowRedirectBack: false
})
