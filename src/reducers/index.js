import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import auth from './auth'
import user from './user'
import record from './record'
import userRecord from './userRecord'

const rootReducer = combineReducers({
  form,
  auth,
  user,
  record,
  userRecord,
})

export default rootReducer
