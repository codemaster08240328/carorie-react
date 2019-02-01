import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Navbar, NavbarToggler, NavbarBrand, Collapse, Nav, NavItem } from 'reactstrap'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { logOut, initializeStatus } from 'actions/auth'
import { selectLoggedInUser } from 'selectors'
import { isAdminOrManager, isAdminOrUser } from 'utils/roleHelper'

class Menu extends Component {
  static propTypes = {
    logOut: PropTypes.func,
    loggedInUser: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    const { loggedInUser, initializeStatus } = this.props

    return (
      <Navbar color="faded" light toggleable>
        <NavbarToggler right onClick={this.toggle} />
        <NavbarBrand tag={Link} to={'/dashboard'}>Dashboard</NavbarBrand>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            { isAdminOrManager(loggedInUser) &&
              <NavItem>
                <Link to='/users' className='nav-link'>Users</Link>
              </NavItem>
            }
            { isAdminOrUser(loggedInUser) &&
              <NavItem>
                <Link to='/records' className='nav-link'>Records</Link>
              </NavItem>
            }
            { loggedInUser &&
              <NavItem>
                <Link to='/profile' className='nav-link'>Profile</Link>
              </NavItem>
            }
            { !loggedInUser &&
              <NavItem>
                <Link to='/register' className='nav-link' onClick={initializeStatus}>Register</Link>
              </NavItem>
            }
            { !loggedInUser &&
              <NavItem>
                <Link to='/login' className='nav-link' onClick={initializeStatus}>Log In</Link>
              </NavItem>
            }
            { loggedInUser &&
              <NavItem>
                <Link to='/' onClick={this.props.logOut} className='nav-link'>Logout</Link>
              </NavItem>
            }
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  loggedInUser: selectLoggedInUser,
})

const mapDispatchToProps = {
  logOut,
  initializeStatus,
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)