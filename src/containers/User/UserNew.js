import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Row, Col, Form, Button, Alert } from 'reactstrap'
import { Field, reduxForm } from 'redux-form'
import { userNewRequest } from 'actions/user'
import RenderField from 'components/RenderField'
import userCreatFormValidator from './newValidate'
import { selectUserState, selectLoggedInUser } from 'selectors'
import { USER_NEW_REQUEST, USER_NEW_SUCCESS } from 'constants/user'
import { getRoleOptions } from 'utils/optionHelper'

class UserNew extends Component {
  static propTypes = {
    userNewRequest: PropTypes.func,
    handleSubmit: PropTypes.func,
    loggedInUser: PropTypes.object,
    userState: PropTypes.object,
  }

  componentWillReceiveProps(nextProps) {
    const { userState: { status }, history } = nextProps
    if (status === USER_NEW_SUCCESS) {
      history.push('/users')
    }
  }

  handleNew = (values) => {
    const { userNewRequest } = this.props
    userNewRequest(values)
  }

  render() {
    const { handleSubmit, userState: { status, error }, loggedInUser, history } = this.props
    return(
      <Row>
        <Col sm={12} md={{ size: 4, offset: 4 }}>
          <h2 className="text-center mb-3">Add User</h2>
          {error && <Alert color='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit(this.handleNew)}>
            <Field
              label='Username'
              name='username'
              type='text'
              component={RenderField}
            />
            <Field
              label='First Name'
              name='first_name'
              type='text'
              component={RenderField}
            />
            <Field
              label='Last Name'
              name='last_name'
              type='text'
              component={RenderField}
            />
            <Field
              label='Expected Calories per day'
              name='expected_cal'
              type='number'
              component={RenderField}
            />
            <Field
              label='Role'
              name='role'
              type='select'
              component={RenderField}
              options={getRoleOptions(loggedInUser.role)}
            />
            <Field
              label='Password'
              name='password'
              type='password'
              component={RenderField}
            />
            <Field
              label='Confirm Password'
              name='confirm_password'
              type='password'
              component={RenderField}
            />
            <div className='text-center'>
              <Button color='primary' disabled={status===USER_NEW_REQUEST}>Create</Button>{' '}
              <Button color='danger' type='button' onClick={() => history.goBack()}>Back</Button>
            </div>
          </Form>
        </Col>
      </Row>  
    )
  }
}

const mapStateToProps = createStructuredSelector({
  loggedInUser: selectLoggedInUser,
  userState: selectUserState,
})

const mapDispatchToProps = {
  userNewRequest,
}

export default compose(
  reduxForm({
    form: 'userCreateForm',
    validate: userCreatFormValidator,
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(UserNew)
