import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Row, Col, Form, Button, Alert } from 'reactstrap'
import { Field, reduxForm } from 'redux-form'
import { selectAuthState } from 'selectors'
import { registerRequest } from 'actions/auth'
import RenderField from 'components/RenderField'
import { REGISTER_REQUEST } from 'constants/auth'
import registerFormValidator from './validate'

class Register extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    registerRequest: PropTypes.func,
    auth: PropTypes.object,
  }

  handleRegister = (values) => {
    const { registerRequest } = this.props
    registerRequest(values)
  }

  render() {
    const { auth: { status, error } , handleSubmit } = this.props

    return (
      <Row>
        <Col sm={12} md={{ size: 4, offset: 4 }}>
          <h2 className="text-center mb-3">Register</h2>
          {error && <Alert color='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit(this.handleRegister)}>
            <Field
              label='Username'
              name='username'
              type='text'
              component={RenderField}
            />
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
              <Button color='primary' type='submit' disabled={status===REGISTER_REQUEST}>Register</Button>
            </div>
          </Form>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  auth: selectAuthState,
})

const mapDispatchToProps = {
  registerRequest,
}

export default compose(
  reduxForm({
    form: 'registerForm',
    validate: registerFormValidator,
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(Register)
