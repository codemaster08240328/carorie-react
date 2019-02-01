import React, { Component } from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'
import { pick } from 'lodash'
import { Row, Col, Table, Button, Form, Alert } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import DateTimeField from 'components/DateTimeField'
import Pagination from 'components/Pagination'
import { recordListRequest, recordDeleteRequest } from 'actions/record'
import { selectRecords, selectRecordParams, selectLoggedInUser } from 'selectors'
import { getStringFromDate, getStringFromTime } from 'utils/dateHelper'

class RecordList extends Component {
  static propTypes = {
    recordListRequest: PropTypes.func,
    recordDeleteRequest: PropTypes.func,
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
    const { recordListRequest, params } = this.props
    recordListRequest(params)
  }

  deleteRecordHandler = (id) => {
    const { recordDeleteRequest } = this.props
    if (confirm('Are you sure?')) { // eslint-disable-line
      recordDeleteRequest(id)
    }
  }

  filterHandler = (values) => {
    const { recordListRequest } = this.props
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
      recordListRequest({
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

    const { reset, params, recordListRequest } = this.props
    reset()

    recordListRequest({
      ...params,
      date_from: null,
      date_to: null,
      time_from: null,
      time_to: null,
    })
  }

  paginationUpdateHandler = pagination => {
    const { recordListRequest, params } = this.props
    recordListRequest({
      ...pick(params, ['page', 'page_size', 'date_from', 'date_to', 'time_from', 'time_to']),
      ...pagination,
    })
  }

  render() {
    const { filterError } = this.state
    const { handleSubmit, records, params, loggedInUser } = this.props
    const pgInfo = {...params}

    return(
      <div>
        <h2 className='mb-3'>Records <Button color='primary' size='sm' tag={Link} to={'records/new'}>+</Button></h2>
        <Row className='text-right mb-3'>
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
                  {loggedInUser.role !== 'user' && <th>Username</th>}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  records && records.map((record, index) => {
                    const { id, date, time, text, calorie, username, exceeded } = record
                    const rowClass = className({
                      red: exceeded,
                      green: !exceeded,
                    })

                    return (
                      <tr key={index} className={rowClass}>
                        <td>{date}</td>
                        <td>{time}</td>
                        <td>{text}</td>
                        <td>{calorie}</td>
                        {loggedInUser.role !== 'user' && <td>{username}</td>}
                        <td>
                          <Button color='primary' size='sm' tag={Link} to={`/records/update/${id}`}>Update</Button>{' '}
                          <Button color='danger' size='sm' onClick={ () => this.deleteRecordHandler(id) }>Delete</Button>
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
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  loggedInUser: selectLoggedInUser,
  records: selectRecords,
  params: selectRecordParams,
  initialValues: selectRecordParams,
})

const mapDispatchToProps = {
  recordListRequest,
  recordDeleteRequest,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'recordFilterForm',
    enableReinitialize: true,
  }),
)(RecordList)
