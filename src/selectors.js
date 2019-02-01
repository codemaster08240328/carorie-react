export const selectAuthState = state => state.auth
export const selectAuthenticated = state => !!state.auth.loggedInUser
export const selectLoggedInUser = state => state.auth.loggedInUser

export const selectUserState = state => state.user
export const selectUsers = state => state.user.users
export const selectUser = state => state.user.user
export const selectUserParams = state => state.user.params

export const selectRecordState = state => state.record
export const selectRecords = state => state.record.records
export const selectRecord = state => state.record.record
export const selectRecordParams = state => state.record.params
export const selectAllUsers = state => state.record.users

export const selectUserRecordState = state => state.userRecord
export const selectUserRecords = state => state.userRecord.records
export const selectUserRecord = state => state.userRecord.record
export const selectUserRecordParams = state => state.userRecord.params
