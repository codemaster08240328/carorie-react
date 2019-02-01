import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import { Alert, Button, Row, Col, Form } from 'reactstrap'
import { createStructuredSelector } from 'reselect'
import RenderField from 'components/RenderField'
import DateTimeField from 'components/DateTimeField'
import { userRecordDetailRequest, userRecordUpdateRequest } from 'actions/userRecord'
import { selectUserRecord, selectUserRecordState } from 'selectors'
import { getStringFromDate, getStringFromTime, isDateField, isTimeField } from 'utils/dateHelper'
import { USER_RECORD_UPDATE_REQUEST, USER_RECORD_UPDATE_SUCCESS } from 'constants/userRecord'
import userRecordUpdateValidator from './validate'

class UserRecordUpdate extends Component {
  static propTypes = {
    userRecordDetailRequest: PropTypes.func,
    userRecordUpdateRequest: PropTypes.func,
    match: PropTypes.object,
    userRecordState: PropTypes.object,
    initialValues: PropTypes.object,
    history: PropTypes.object,
  }

  componentWillMount() {
    const { userRecordDetailRequest, match: { params: { id, rid } }  } = this.props
    userRecordDetailRequest(id, rid)
  }

  componentWillReceiveProps(nextProps) {
    const { userRecordState: { status }, history, match: { params: { id } } } = nextProps
    if (status === USER_RECORD_UPDATE_SUCCESS) {
      history.push(`/users/${id}/records/`)
    }
  }

  handleUpdate = values => {
    const { userRecordUpdateRequest, match: { params: { id, rid } } } = this.props
    userRecordUpdateRequest(id, rid, {
      ...values,
      date: getStringFromDate(values.date),
      time: getStringFromTime(values.time),
    })
  }

  render() {
    const { handleSubmit, userRecordState: { status, error }, history } = this.props

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
            <div className='text-center'>
              <Button color='primary' type='submit' disabled={status===USER_RECORD_UPDATE_REQUEST}>Update</Button>{' '}
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
  initialValues: selectUserRecord,
})
  
const mapDispatchToProps = {
  userRecordDetailRequest,
  userRecordUpdateRequest,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'userRecordUpdateForm',
    enableReinitialize: true,
    validate: userRecordUpdateValidator,
  }),
)(UserRecordUpdate)
