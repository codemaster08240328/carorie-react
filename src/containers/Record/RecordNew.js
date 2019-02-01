import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Row, Col, Form, Button, Alert } from 'reactstrap'
import { Field, reduxForm } from 'redux-form'
import { recordNewRequest, recordAllUserRequest } from 'actions/record'
import RenderField from 'components/RenderField'
import DateTimeField from 'components/DateTimeField'
import { selectRecordState, selectAllUsers, selectLoggedInUser } from 'selectors'
import { getUserOptions } from 'utils/optionHelper'
import { getStringFromDate, getStringFromTime, isDateField, isTimeField } from 'utils/dateHelper'
import { RECORD_NEW_REQUEST, RECORD_NEW_SUCCESS } from 'constants/record'
import recordCreatFormValidator from './validate'

class RecordNew extends Component {
  static propTypes = {
    recordNewRequest: PropTypes.func,
    recordAllUserRequest: PropTypes.func,
    handleSubmit: PropTypes.func,
    recordState: PropTypes.object,
    initialValues: PropTypes.object,
    users: PropTypes.array,
  }

  componentWillMount() {
    const { recordAllUserRequest } = this.props
    recordAllUserRequest()
  }

  componentWillReceiveProps(nextProps) {
    const { recordState: { status }, history } = nextProps
    if (status === RECORD_NEW_SUCCESS) {
      history.push('/records')
    }
  }

  handleNew = (values) => {
    const { recordNewRequest } = this.props
    recordNewRequest({
      ...values,
      date: getStringFromDate(values.date),
      time: getStringFromTime(values.time),
    })
  }

  render() {
    const { handleSubmit, recordState: { status, error }, users, loggedInUser, history } = this.props
    const userOptions = getUserOptions(users)

    return(
      <Row>
        <Col sm={12} md={{ size: 4, offset: 4 }}>
          <h2 className="text-center mb-3">Add Record</h2>
          {error && <Alert color='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit(this.handleNew)}>
            <Field
              label='Date'
              name='date'
              dateFormat={'YYYY-MM-DD'}
              timeFormat={false}
              validate={[isDateField]}
              component={DateTimeField}
            />
            <Field
              label='Time'
              name='time'
              dateFormat={false}
              timeFormat={'HH:mm:ss'}
              validate={[isTimeField]}
              component={DateTimeField}
            />
            <Field
              label='Text'
              name='text'
              type='text'
              component={RenderField}
            />
            <Field
              label='Calorie'
              name='calorie'
              type='number'
              component={RenderField}
            />
            { loggedInUser.role !== 'user' && 
              <Field
                label='User'
                name='user'
                type='select'
                component={RenderField}
                options={userOptions}
              />
            }
            <div className='text-center'>
              <Button color='primary' type='submit' disabled={status===RECORD_NEW_REQUEST}>Create</Button>{' '}
              <Button color='danger' type='button' onClick={() => history.goBack()}>Back</Button>
            </div>
          </Form>
        </Col>
      </Row>  
    )
  }
}

const mapStateToProps = createStructuredSelector({
  recordState: selectRecordState,
  users: selectAllUsers,
  loggedInUser: selectLoggedInUser,
  initialValues: (state) => 
    state.auth.loggedInUser.role === 'user' ? { user: state.auth.loggedInUser.id } : {}
})

const mapDispatchToProps = {
  recordNewRequest,
  recordAllUserRequest,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'recordCreateForm',
    enableReinitialize: true,
    validate: recordCreatFormValidator,
  })
)(RecordNew)
