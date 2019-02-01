import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Row, Col, Form, Button, Alert } from 'reactstrap'
import { Field, reduxForm } from 'redux-form'
import { profileUpdateRequest, profileGetRequest } from 'actions/auth'
import { selectAuthState, selectLoggedInUser } from 'selectors'
import { getRoleName } from 'utils/roleHelper'
import { PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS } from 'constants/auth'
import RenderField from 'components/RenderField'
import profileFormValidator from './validate'


class Profile extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    profileUpdateRequest: PropTypes.func,
    profileGetRequest: PropTypes.func,
    auth: PropTypes.object,
    initialValues: PropTypes.object,
  }

  componentWillMount() {
    const { profileGetRequest } = this.props
    profileGetRequest()
  }

  handleUpdate = (values) => {
    let data = {}

    for (let key in values) {
      if (key !== 'role') {
        data[key] = values[key]
      }
    }

    this.props.profileUpdateRequest(data)
  }

  render() {
    const { auth: { status, error } , handleSubmit, initialValues: { username, first_name, last_name, role }, history } = this.props
    return (
      <Row>
        <Col xs={12} sm={12} md={{ size: 4, offset: 4 }}>
          <div className="text-center">
            <h2>{first_name} {last_name} ({username})</h2><h5>{getRoleName(role)}</h5>
          </div>
          {status===PROFILE_UPDATE_SUCCESS && <Alert color='success'>Profile updated successfully</Alert>}
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
              <Button color='primary' type='submit' disabled={status===PROFILE_UPDATE_REQUEST}>Update</Button>{' '}
              <Button color='danger' type='button' onClick={() => history.goBack()}>Back</Button>
            </div>
          </Form>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  auth: selectAuthState,
  initialValues: selectLoggedInUser,
})

const mapDispatchToProps = {
  profileUpdateRequest,
  profileGetRequest,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'profileForm',
    enableReinitialize: true,
    validate: values => {
      let errors = profileFormValidator(values)
      if (values.password !== values.confirm_password) {
        errors.confirm_password = 'Confirm password is not equal to password'
      }
      return errors
    },
  }),
)(Profile)
