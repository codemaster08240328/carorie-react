import React, { Component } from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'
import { pick } from 'lodash'
import { Row, Col, Table, Button, Form, Alert } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { createStructuredSelector } from 'reselect'
import DateTimeField from 'components/DateTimeField'
import Pagination from 'components/Pagination'
import { userDetailRequest } from 'actions/user'
import { userRecordListRequest, userRecordDeleteRequest } from 'actions/userRecord'
import { selectUserRecords, selectUserRecordParams, selectUser } from 'selectors'
import { getStringFromDate, getStringFromTime } from 'utils/dateHelper'

class UserRecordList extends Component {
  static propTypes = {
    userRecordListRequest: PropTypes.func,
    userRecordDeleteRequest: PropTypes.func,
    reset: PropTypes.func,
    location: PropTypes.object,
    params: PropTypes.object,
    records: PropTypes.array, 
  }

  constructor(props) {
    super(props)

    this.state = {
      filterError: null,
    }
  }

  componentWillMount() {
    const { userRecordListRequest, userDetailRequest, params, match: { params: { id } } } = this.props
    userRecordListRequest(id, params)
    userDetailRequest(id)
  }

  deleteUserRecordHandler = (id, rid) => {
    const { userRecordDeleteRequest } = this.props
    if (confirm('Are you sure?')) { // eslint-disable-line
      userRecordDeleteRequest(id, rid)
    }
  }

  filterHandler = (values) => {
    const { userRecordListRequest, match: { params: { id } } } = this.props
    const { date_from, date_to, time_from, time_to } = values

    const dateFromStr = getStringFromDate(date_from)
    const dateToStr = getStringFromDate(date_to)
    const timeFromStr = getStringFromTime(time_from)
    const timeToStr = getStringFromTime(time_to)

    this.setState({
      filterError: null,
    })

    if (!dateToStr && !dateFromStr && !timeToStr && !timeFromStr) {
      this.setState({
        filterError: 'Please input at least one filter',
      })
    } else if (dateToStr && dateFromStr && dateToStr < dateFromStr) {
      this.setState({
        filterError: 'Start time should be earlier than end time',
      })
    } else if (timeToStr && timeFromStr && timeToStr < timeFromStr) {
      this.setState({
        filterError: 'Start date should be earlier than end date',
      })
    } else if (timeToStr === 'Invalid date' || timeFromStr === 'Invalid date' || dateFromStr === 'Invalid date' || dateToStr === 'Invalid date') {
      this.setState({
        filterError: 'Please input filters in correct format',
      })
    } else {
      userRecordListRequest(id, {
        date_from: dateFromStr,
        date_to: dateToStr,
        time_from: timeFromStr,
        time_to: timeToStr,
        page: 1,
        page_size: 10,
      })
    }
  }

  filterResetHandler = () => {
    if (this.state.filterError) {
      this.setState({
        filterError: null,
      })
    } 
    
    const { reset, params, userRecordListRequest, match: { params: { id } } } = this.props
    reset()

    userRecordListRequest(id, {
      ...params,
      date_from: null,
      date_to: null,
      time_from: null,
      time_to: null,
    })
  }

  paginationUpdateHandler = pagination => {
    const { userRecordListRequest, params, match: { params: { id } } } = this.props
    userRecordListRequest(id, {
      ...pick(params, ['page', 'page_size', 'date_from', 'date_to', 'time_from', 'time_to']),
      ...pagination,
    })
  }

  render() {
    const { filterError } = this.state
    const { handleSubmit, records, params, user, history, match: { params: { id } } } = this.props
    const pgInfo = {...params}

    return(
      <div>
        { user && <div>
          <h2 className='mb-3'><Button color='success' size='sm' onClick={() => history.goBack()}>Back</Button> {user.first_name} {user.last_name}'s Records <Button color='primary' size='sm' tag={Link} to={`/users/${id}/records/new`}>+</Button></h2>
          <Row className='text-right mb-2'>
            <Col md={12} xs={12}>
              <Form inline onSubmit={handleSubmit(this.filterHandler)}>
                <Field
                  placeholder='Date from'
                  name='date_from'
                  dateFormat='YYYY-MM-DD'
                  timeFormat={false}
                  component={DateTimeField}
                />
                &nbsp;
                <Field
                  placeholder='Date to'
                  name='date_to'
                  dateFormat='YYYY-MM-DD'
                  timeFormat={false}
                  component={DateTimeField}
                />
                &nbsp;
                <Field
                  placeholder='Time from'
                  name='time_from'
                  dateFormat={false}
                  timeFormat='HH:mm:ss'
                  component={DateTimeField}
                />
                &nbsp;
                <Field
                  placeholder='Time to'
                  name='time_to'
                  dateFormat={false}
                  timeFormat='HH:mm:ss'
                  component={DateTimeField}
                />
                &nbsp;
                <Button color='success'>Filter</Button>
                &nbsp;
                <Button color='info' onClick={this.filterResetHandler}>Reset</Button>
              </Form>
            </Col>
          </Row>
          {
            filterError && <Row>
              <Col md={12}>
                <Alert color='danger'>{filterError}</Alert>
              </Col>
            </Row>
          }
          <Row>
            <Col sm={12} md={12}>
              <Table bordered>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Text</th>
                    <th>Calorie</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    records && records.map((record, index) => {
                      const rowClass = className({
                        red: record.exceeded,
                        green: !record.exceeded,
                      })

                      return (
                        <tr key={index} className={rowClass}>
                          <td>{record.date}</td>
                          <td>{record.time}</td>
                          <td>{record.text}</td>
                          <td>{record.calorie}</td>
                          <td>
                            <Button color='primary' size='sm' tag={Link} to={`/users/${id}/records/update/${record.id}`}>Update</Button>{' '}
                            <Button color='danger' size='sm' onClick={ () => this.deleteUserRecordHandler(id, record.id) }>Delete</Button>
                          </td>
                        </tr>
                      )
                    })
                  }
                  { 
                    records && records.length === 0 && 
                    <tr>
                      <td colSpan='6' className='text-center'>No Records</td>
                    </tr>
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
          { records && records.length > 0 && <Pagination pgInfo={pgInfo} update={this.paginationUpdateHandler} /> }
        </div>}
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  records: selectUserRecords,
  params: selectUserRecordParams,
  initialValues: selectUserRecordParams,
  user: selectUser,
})

const mapDispatchToProps = {
  userDetailRequest,
  userRecordListRequest,
  userRecordDeleteRequest,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'recordFilterForm',
    enableReinitialize: true,
  }),
  withRouter,
)(UserRecordList)
