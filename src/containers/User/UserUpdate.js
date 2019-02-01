import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Alert, Button, Row, Col, Form } from 'reactstrap'
import { createStructuredSelector } from 'reselect'
import RenderField from 'components/RenderField'
import { userDetailRequest, userUpdateRequest } from 'actions/user'
import { selectUser, selectUserState, selectLoggedInUser } from 'selectors'
import { getRoleOptions } from 'utils/optionHelper'
import { USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from 'constants/user'
import userUpdateValidator from './updateValidate'

class UserUpdate extends Component {
  static propTypes = {
    userDetailRequest: PropTypes.func,
    userUpdateRequest: PropTypes.func,
    handleSubmit: PropTypes.func,
    match: PropTypes.object,
    userState: PropTypes.object,
    history: PropTypes.object,
    initialValues: PropTypes.object,
  }

  componentWillMount() {
    const { id } = this.props.match.params
    const { userDetailRequest } = this.props
    userDetailRequest(id)
  }

  componentWillReceiveProps(nextProps) {
    const { userState: { status }, history } = nextProps
    if (status === USER_UPDATE_SUCCESS) {
      history.push('/users')
    }
  }

  handleUpdate = values => {
    const { userUpdateRequest } = this.props
    userUpdateRequest(values)
  }

  render() {
    const { handleSubmit, userState: { status, error }, loggedInUser, history } = this.props
    
    return(
      <Row>
        <Col sm={12} md={{ size: 8, offset: 2 }}>
          <h2 className="text-center mb-3">User Update</h2>
          {error && <Alert color='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit(this.handleUpdate)}>
            <Field
              label='First name'
              name='first_name'
              type='text'
              component={RenderField}
            />
            <Field
              label='Last name'
              name='last_name'
              type='text'
              component={RenderField}
            />
            <Field
              label='Expected number of calories per day'
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
            >
            </Field>
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
              <Button color='primary' type='submit' disabled={status===USER_UPDATE_REQUEST}>Update</Button>{' '}
              <Button color='danger' type='button' onClick={() => history.goBack()}>Back</Button>
            </div>
          </Form>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  userState: selectUserState,
  loggedInUser: selectLoggedInUser,
  initialValues: selectUser,
})
  
const mapDispatchToProps = {
  userDetailRequest,
  userUpdateRequest,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'userUpdateForm',
    enableReinitialize: true,
    validate: values => {
      let errors = userUpdateValidator(values)
      if (values.password !== values.confirm_password) {
        errors.confirm_password = 'Confirm password is not equal to password'
      }
      return errors
    }
  }),
)(UserUpdate)
