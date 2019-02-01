import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectLoggedInUser } from 'selectors'
import { createStructuredSelector } from 'reselect'
import { Col, Row, Jumbotron } from 'reactstrap'
import { getRoleName } from 'utils/roleHelper'

const Dashboard = ({ loggedInUser }) => {
  const { first_name, last_name, role } = loggedInUser
  return (
    <Row>
      <Col xs={12} md={{ size: 6, offset: 3}}>
        <Jumbotron>
          <h2>Hello, {first_name} {last_name}!</h2>
          You're {getRoleName(role)}
        </Jumbotron>
      </Col>
    </Row>
  )
}

Dashboard.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
}

const mapStateToProps = createStructuredSelector({
  loggedInUser: selectLoggedInUser,
})

export default connect(mapStateToProps)(Dashboard)
