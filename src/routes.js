import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import { selectAuthenticated } from 'selectors'
import { createStructuredSelector } from 'reselect'
import Login from 'containers/Login'
import Register from 'containers/Register'
import Dashboard from 'containers/Dashboard'
import Menu from 'containers/Menu'
import Profile from 'containers/Profile'
import { RecordList, RecordNew, RecordUpdate } from 'containers/Record'
import { UserList, UserNew, UserUpdate } from 'containers/User'
import { UserRecordList, UserRecordNew, UserRecordUpdate } from 'containers/UserRecord'
import {
  userIsAuthenticatedRedir,
  userIsNotAuthenticatedRedir,
  userIsAdminOrManagerRedir,
  userIsAdminOrUserRedir,
  userIsAdminRedir,
}
from 'utils/authHelper'

const Routes = ({ authenticated }) => {
  const rootComponent = <Redirect to={ authenticated ? '/dashboard' : '/login' } />

  const loginComponent = userIsNotAuthenticatedRedir(Login)
  const registerComponent = userIsNotAuthenticatedRedir(Register)
  const dashboardComponent = userIsAuthenticatedRedir(Dashboard)
  const profileComponent = userIsAuthenticatedRedir(Profile)

  const userUpdateComponent = userIsAdminOrManagerRedir(UserUpdate)
  const userNewComponent = userIsAdminOrManagerRedir(UserNew)
  const userListComponent = userIsAdminOrManagerRedir(UserList)

  const recordUpdateComponent = userIsAdminOrUserRedir(RecordUpdate)
  const recordNewComponent = userIsAdminOrUserRedir(RecordNew)
  const recordListComponent = userIsAdminOrUserRedir(RecordList)

  const userRecordUpdateComponent = userIsAdminRedir(UserRecordUpdate)
  const userRecordNewComponent = userIsAdminRedir(UserRecordNew)
  const userRecordListComponent = userIsAdminRedir(UserRecordList)

  return (
    <Router>
      <div>
        <Menu />
        <Container className="main-container">
          <Route exact path='/' render={() => rootComponent} />
          <Route path='/login' component={loginComponent} />
          <Route path='/register' component={registerComponent} />
          <Route path='/dashboard' component={dashboardComponent} />
          <Route path='/profile' component={profileComponent} />

          <Route exact path='/users/:id/records/update/:rid' component={userRecordUpdateComponent} />
          <Route exact path='/users/:id/records/new' component={userRecordNewComponent} />
          <Route exact path='/users/:id/records/' component={userRecordListComponent} />

          <Route path='/users/update/:id' component={userUpdateComponent} />
          <Route path='/users/new' component={userNewComponent} />
          <Route exact path='/users' component={userListComponent} />

          <Route path='/records/update/:id' component={recordUpdateComponent} />
          <Route path='/records/new' component={recordNewComponent} />
          <Route exact path='/records' component={recordListComponent} />
        </Container>
      </div>
    </Router>
  )
}

Routes.PropTypes = {
  authenticated: PropTypes.bool,
}

const mapStateToProps = createStructuredSelector({
  authenticated: selectAuthenticated,
})

export default connect(mapStateToProps)(Routes)
