// ** React Imports
import { useState, useEffect } from 'react'
import Flatpickr from "react-flatpickr"

// ** Columns
import { columns } from './columns'

// ** Store & Actions
import { getAllReviewData, getReviewData } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, Input, Row, Col, Label, CustomInput } from 'reactstrap'

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
				<Col
					xl='6'
					className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
				>
					<div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
						<Label className='mb-0' for='search-invoice'>
							Search:
						</Label>
						<Input
							id='search-invoice'
							className='ml-50 w-100'
							type='text'
							value={searchTerm}
							onChange={e => handleFilter(e.target.value)}
						/>
					</div>
				</Col>
			</Row>
		</div>
	)
}

const PatientTable = () => {
	// ** Store Vars
	const dispatch = useDispatch()
	const store = useSelector(state => state.patient)

	// ** States
	const [currentPage, setCurrentPage] = useState(1)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	// ** Get data on mount
	useEffect(() => {
		dispatch(getAllReviewData())
		dispatch(
			getReviewData({
				page: currentPage,
				perPage: rowsPerPage
			})
		)
	}, [dispatch, store.data.length])

	// ** Function in get data on page change
	const handlePagination = page => {
		dispatch(
			getReviewData({
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
			getReviewData({
				page: currentPage,
				perPage: value
			})
		)
		setRowsPerPage(value)
	}

	// ** Function in get data on search query change
	const handleFilter = () => {
		dispatch(
			getReviewData({
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

	return (
		<div>
			<Row className={'d-flex align-items-end justify-content-end'}>
				<Col>
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
