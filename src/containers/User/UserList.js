import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Button } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { createStructuredSelector } from 'reselect'
import { pick } from 'lodash'
import Pagination from 'components/Pagination'
import { userListRequest, userDeleteRequest } from 'actions/user'
import { selectUsers, selectUserParams, selectLoggedInUser } from 'selectors'
import { getStringFromDate } from 'utils/dateHelper'
import { getRoleName } from 'utils/roleHelper'

class UserList extends Component {
  static propTypes = {
    userListRequest: PropTypes.func,
    userDeleteRequest: PropTypes.func,
    location: PropTypes.object,
    params: PropTypes.object,
    users: PropTypes.array,
  }

  componentWillMount() {
    const { userListRequest, params } = this.props
    userListRequest(params)
  }

  deleteUserHandler = id => {
    const { userDeleteRequest } = this.props
    if (confirm('Are you sure?')) { // eslint-disable-line
      userDeleteRequest(id)
    }
  }

  paginationUpdateHandler = pagination => {
    const { userListRequest, params } = this.props
    userListRequest({
      ...pick(params, ['page', 'page_size']),
      ...pagination,
    })
  }

  render() {
    const { users, params, loggedInUser } = this.props
    const pgInfo = {...params}
    
    return(
      <div>
        <h2 className='mb-3'>Users <Button color='primary' size='sm' tag={Link} to={'users/new'}>+</Button></h2>
        <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>Expected Calories</th>
              <th>Registered Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              users && users.map((user, index) => {
                const { id, first_name, last_name, username, role, expected_cal, date_joined } = user
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{first_name} {last_name}</td>
                    <td>{username}</td>
                    <td>{getRoleName(role)}</td>
                    <td>{expected_cal}</td>
                    <td>{getStringFromDate(date_joined)}</td>
                    <td>
                      { loggedInUser.role === 'admin' && <Button color='success' size='sm' tag={Link} to={`/users/${id}/records`}>Records</Button>}{' '}
                      { loggedInUser.id !== id && <Button color='primary' size='sm' tag={Link} to={`/users/update/${id}/`}>Update</Button>}{' '}
                      { loggedInUser.id !== id && <Button color='danger' size='sm' onClick={ () => this.deleteUserHandler(id) }>Delete</Button>}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
        <Pagination pgInfo={pgInfo} update={this.paginationUpdateHandler} />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  users: selectUsers,
  params: selectUserParams,
  loggedInUser: selectLoggedInUser,
})

const mapDispatchToProps = {
  userListRequest,
  userDeleteRequest,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(UserList)
