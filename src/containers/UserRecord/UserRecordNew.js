import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { createStructuredSelector } from 'reselect'
import { Row, Col, Form, Button, Alert } from 'reactstrap'
import { Field, reduxForm } from 'redux-form'
import { userRecordNewRequest } from 'actions/userRecord'
import RenderField from 'components/RenderField'
import DateTimeField from 'components/DateTimeField'
import { selectUserRecordState } from 'selectors'
import { getStringFromDate, getStringFromTime, isDateField, isTimeField } from 'utils/dateHelper'
import { USER_RECORD_NEW_REQUEST, USER_RECORD_NEW_SUCCESS } from 'constants/userRecord'
import userRecordCreatFormValidator from './validate'

class UserRecordNew extends Component {
  static propTypes = {
    userRecordNewRequest: PropTypes.func,
    handleSubmit: PropTypes.func,
    userRecordState: PropTypes.object,
    initialValues: PropTypes.object,
  }

  componentWillReceiveProps(nextProps) {
    const { userRecordState: { status }, history, match: { params: { id } } } = nextProps
    if (status === USER_RECORD_NEW_SUCCESS) {
      history.push(`/users/${id}/records`)
    }
  }

  handleNew = (values) => {
    const { userRecordNewRequest, match: { params: { id } } } = this.props
    userRecordNewRequest(id, {
      ...values,
      date: getStringFromDate(values.date),
      time: getStringFromTime(values.time),
    })
  }

  render() {
    const { handleSubmit, userRecordState: { status, error }, history } = this.props

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
            <div className='text-center'>
              <Button color='primary' type='submit' disabled={status===USER_RECORD_NEW_REQUEST}>Create</Button>{' '}
              <Button color='danger' type='button' onClick={() => history.goBack()}>Back</Button>
            </div>
          </Form>
        </Col>
      </Row>  
    )
  }
}

const mapStateToProps = createStructuredSelector({
  userRecordState: selectUserRecordState,
})

const mapDispatchToProps = {
  userRecordNewRequest,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'userRecordCreateForm',
    enableReinitialize: true,
    validate: userRecordCreatFormValidator,
  }),
  withRouter,
)(UserRecordNew)
