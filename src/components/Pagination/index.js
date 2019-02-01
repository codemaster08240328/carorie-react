import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap'

class MyPagination extends Component {
  static propTypes = {
    update: PropTypes.func,
    pgInfo: PropTypes.object,
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

  pageSizeHandler = size => () => {
    const { pgInfo: { page_size }, update } = this.props
    if (size !== page_size) {
      update({
        page_size: size,
        page: 1,
      })
    }
  }

  pageClickHandler = page => () => {
    const { pgInfo, update } = this.props

    if (page === 'prev') {
      page = Math.max(1, pgInfo.page - 1)
    } else if (page === 'next') {
      page = Math.min(Math.ceil(pgInfo.count / pgInfo.page_size), pgInfo.page + 1)
    }

    if (page !== pgInfo.page) {
      update({
        page: page,
      })
    }
  }

  render() {
    const { isOpen } = this.state
    const { pgInfo: { page_size, count, page } } = this.props

    const pageSizes = [5, 10, 20]
    const pageCount = Math.ceil(count/page_size)
    const pages = new Array(pageCount).fill(0)

    return (
      <Row>
        <Col>
          <ButtonDropdown isOpen={isOpen} toggle={this.toggle} dropup>
            <DropdownToggle caret>
              { page_size }
            </DropdownToggle>
            <DropdownMenu>
              {
                pageSizes.map((size, index) => <DropdownItem key={index} onClick={this.pageSizeHandler(size)}>{size}</DropdownItem>)
              }
            </DropdownMenu>
          </ButtonDropdown>
        </Col>
        <Col>
          <Pagination>
            <PaginationItem>
              <PaginationLink previous tag='button' onClick={this.pageClickHandler('prev')}
                disabled={page === 1} />
            </PaginationItem>
            {pages.map((item, index) => (
              <PaginationItem key={index} active={index + 1 === page}>
                <PaginationLink tag='button' onClick={this.pageClickHandler(index + 1)}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationLink next tag='button' onClick={this.pageClickHandler('next')}
                disabled={page === pageCount} />
            </PaginationItem>
          </Pagination>
        </Col>
      </Row>
    )
  }
}

export default MyPagination
