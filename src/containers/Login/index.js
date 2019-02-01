import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Row, Col, Form, Button, Alert } from 'reactstrap'
import { Field, reduxForm } from 'redux-form'
import { loginRequest } from 'actions/auth'
import RenderField from 'components/RenderField'
import { selectAuthState } from 'selectors'
import loginFormValidator from './validate'
import { LOGIN_REQUEST } from 'constants/auth'

class Login extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    loginRequest: PropTypes.func,
    auth: PropTypes.object,
  }

  handleLogin = (values) => {
    this.props.loginRequest(values)
  }

  render() {
    const { auth: { status, error } , handleSubmit } = this.props

    return (
      <Row>
        <Col sm={12} md={{ size: 4, offset: 4 }}>
          <h2 className="text-center mb-3">Login</h2>
          {error && <Alert color='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit(this.handleLogin)}>
            <Field
              label='Username'
              name='username'
              type='text'
              component={RenderField}
            />
            <Field
              label='Password'
              name='password'
              type='password'
              component={RenderField}
            />
            <div className='text-center'>
              <Button color='primary' type='submit' disabled={status===LOGIN_REQUEST}>Login</Button>
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
  loginRequest,
}

export default compose(
  reduxForm({
    form: 'loginForm',
    validate: loginFormValidator,
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(Login)
