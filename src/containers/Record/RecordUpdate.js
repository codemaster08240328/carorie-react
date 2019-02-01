import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import { Alert, Button, Row, Col, Form } from 'reactstrap'
import { createStructuredSelector } from 'reselect'
import RenderField from 'components/RenderField'
import DateTimeField from 'components/DateTimeField'
import { recordDetailRequest, recordUpdateRequest, recordAllUserRequest } from 'actions/record'
import { selectRecord, selectRecordState, selectAllUsers, selectLoggedInUser } from 'selectors'
import { getStringFromDate, getStringFromTime, isDateField, isTimeField } from 'utils/dateHelper'
import { getUserOptions } from 'utils/optionHelper'
import { RECORD_UPDATE_REQUEST, RECORD_UPDATE_SUCCESS } from 'constants/record'
import recordUpdateValidator from './validate'

class RecordUpdate extends Component {
  static propTypes = {
    recordDetailRequest: PropTypes.func,
    recordUpdateRequest: PropTypes.func,
    recordAllUserRequest: PropTypes.func,
    match: PropTypes.object,
    recordState: PropTypes.object,
    initialValues: PropTypes.object,
    history: PropTypes.object,
    users: PropTypes.array,
  }

  componentWillMount() {
    const { id } = this.props.match.params
    const { recordDetailRequest, recordAllUserRequest } = this.props
    recordDetailRequest(id)
    recordAllUserRequest()
  }

  componentWillReceiveProps(nextProps) {
    const { recordState: { status }, history } = nextProps
    if (status === RECORD_UPDATE_SUCCESS) {
      history.push('/records')
    }
  }

  handleUpdate = values => {
    const { recordUpdateRequest } = this.props
    recordUpdateRequest({
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
        <Col sm={12} md={{ size: 8, offset: 2 }}>
          <h2 className="text-center mb-3">Record Update</h2>
          {error && <Alert color='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit(this.handleUpdate)}>
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
              timeFormat={'hh:mm:ss'}
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
              type='text'
              component={RenderField}
            >
            </Field>
            { loggedInUser.role !== 'user' &&
              <Field
                label='User'
                name='user'
                type='select'
                component={RenderField}
                options={userOptions}
              >
              </Field>
            }
            <div className='text-center'>
              <Button color='primary' type='submit' disabled={status===RECORD_UPDATE_REQUEST}>Update</Button>{' '}
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
  initialValues: selectRecord,
})
  
const mapDispatchToProps = {
  recordDetailRequest,
  recordUpdateRequest,
  recordAllUserRequest,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'recordUpdateForm',
    enableReinitialize: true,
    validate: recordUpdateValidator,
  }),
)(RecordUpdate)
