// ** React Imports
import React, { useState, useEffect } from 'react'
import Flatpickr from "react-flatpickr"
import Avatar from '@components/avatar'

// ** Columns
import { columns } from './columns'

// ** Store & Actions
import { getAllPatientData, getPatientData } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import {Calendar, ChevronDown} from 'react-feather'
import DataTable from 'react-data-table-component'
import {Card, CardHeader, CardTitle, CardBody, Input, Row, Col, Label, CustomInput, CardText, CardSubtitle,
  ButtonBadge} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Table Header
const CustomHeader = ({ handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  return (
    <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <Label for='rows-per-page'>Show</Label>
            <CustomInput
              className='form-control mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{
                width: '5rem',
                padding: '0 0.8rem',
                backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
              }}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </CustomInput>
            <Label for='rows-per-page'>Entries</Label>
          </div>
        </Col>
        {/*<Col*/}
        {/*  xl='6'*/}
        {/*  className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'*/}
        {/*>*/}
        {/*  <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>*/}
        {/*    <Label className='mb-0' for='search-invoice'>*/}
        {/*      Search:*/}
        {/*    </Label>*/}
        {/*    <Input*/}
        {/*      id='search-invoice'*/}
        {/*      className='ml-50 w-100'*/}
        {/*      type='text'*/}
        {/*      value={searchTerm}*/}
        {/*      onChange={e => handleFilter(e.target.value)}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</Col>*/}
      </Row>
    </div>
  )
}

const PatientTable = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.users)

  // ** States
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllPatientData())
    dispatch(
      getPatientData({
        page: currentPage,
        perPage: rowsPerPage
      })
    )
  }, [dispatch, store.data.length])

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getPatientData({
        page: page.selected + 1,
        perPage: rowsPerPage
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getPatientData({
        page: currentPage,
        perPage: value
      })
    )
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = () => {
    dispatch(
      getPatientData({
        page: currentPage,
        perPage: rowsPerPage
      })
    )
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage))
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
      />
    )
  }

  // ** Table data to render
  const dataToRender = () => {
    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }

  const renderCounts = (label, val, color) => {
    return (
      <div className='d-flex apply-job-package bg-light-primary rounded align-items-center justify-content-between m-2'>
        <div className={'m-1'}>
          <h4 className='d-inline mr-25'>{label}</h4>
        </div>
        <div className={'mr-1'}>
          <Avatar color={color} content={val}/>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Row className={'d-flex align-items-end justify-content-end'}>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>Today</CardTitle>
              <div className='d-flex align-items-center'>
                <Calendar size={15} />
                <Flatpickr
                  options={{
                    mode: 'range',
                    defaultDate: ['2019-05-01', '2019-05-10']
                  }}
                  className='form-control flat-picker bg-transparent border-0 shadow-none'
                />
              </div>
            </CardHeader>
            <CardBody>
              <Row className='match-height'>
                <Col lg='3' md='6' sm='12'>
                  {renderCounts("All", 20, 'light-primary')}
                </Col>
                <Col lg='3' md='6' sm='12'>
                  {renderCounts("W.R.", 10, 'light-success')}
                </Col>
                <Col lg='3' md='6' sm='12'>
                  {renderCounts("E.R.", 10, 'light-danger')}
                </Col>
                <Col lg='3' md='6' sm='12'>
                  {renderCounts("Discharge", 5, 'light-info')}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <DataTable
              noHeader
              pagination
              subHeader
              responsive
              paginationServer
              columns={columns}
              sortIcon={<ChevronDown />}
              className='react-dataTable'
              paginationComponent={CustomPagination}
              data={dataToRender()}
              subHeaderComponent={
                <CustomHeader
                  handlePerPage={handlePerPage}
                  rowsPerPage={rowsPerPage}
                  // searchTerm={searchTerm}
                  handleFilter={handleFilter}
                />
              }
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PatientTable
