// ** React Imports
import { useState, useEffect } from 'react'

// ** Columns
import { columns } from './columns'

// ** Store & Actions
import { getAllPatientData, getPatientData } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { selectThemeColors } from '@utils'
import { Card, CardHeader, CardTitle, CardBody, Input, Row, Col, Label, CustomInput, Button } from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

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
			</Row>
		</div>
	)
}

const PatientSearchTable = () => {
	// ** Store Vars
	const dispatch = useDispatch()
	const store = useSelector(state => state.patient)

	// ** States
	const [searchTerm, setSearchTerm] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [currentOffice, setCurrentOffice] = useState({ value: '', label: 'Select Office' })
	const [currentComplain, setCurrentComplain] = useState('')
	const [currentPatientID, setCurrentPatientID] = useState('')
	const [currentPatientName, setCurrentPatientName] = useState('')

	// ** Get data on mount
	useEffect(() => {
		dispatch(getAllPatientData())
		dispatch(
			getPatientData({
				page: currentPage,
				perPage: rowsPerPage,
				office: currentOffice.value,
				chiefComplain: currentComplain,
				patientID: currentPatientID,
				q: searchTerm
			})
		)
	}, [dispatch, store.patientdata.length])

	// ** User filter options
	const officeOptions = [
		{ value: 'office1', label: 'Office1' },
		{ value: 'office2', label: 'Office2' },
		{ value: 'office3', label: 'Office3' },
		{ value: 'office4', label: 'Office4' },
		{ value: 'office5', label: 'Office5' }
	]

	// ** Function in get data on page change
	const handlePagination = page => {
		dispatch(
			getPatientData({
				page: page.selected + 1,
				perPage: rowsPerPage,
				office: currentOffice.value,
				complain: currentComplain,
				patientID: currentPatientID,
				q: searchTerm
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
				perPage: value,
				office: currentOffice.value,
				complain: currentComplain,
				patientID: currentPatientID,
				q: searchTerm
			})
		)
		setRowsPerPage(value)
	}

	// ** Function in get data on search query change
	const handleFilter = val => {
		setSearchTerm(val)
		dispatch(
			getPatientData({
				page: currentPage,
				perPage: rowsPerPage,
				office: currentOffice.value,
				complain: currentComplain,
				patientID: currentPatientID,
				q: val
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
		const filters = {
			office: currentOffice.value,
			complain: currentComplain,
			patientID: currentPatientID,
			patientName: currentPatientName,
			q: searchTerm
		}

		const isFiltered = Object.keys(filters).some(function (k) {
			return filters[k].length > 0
		})
		if (store.patientdata.length > 0) {
			return store.patientdata.filter(item => {
				var fullname = item.profile.first_name + " " + item.profile.last_name;
				return fullname.includes(filters.patientName) && (item.profile.id == filters.patientID || filters.patientID == "")
			});

		}

		if (store.patientdata.length > 0) {
			return store.patientdata
		} else if (store.patientdata.length === 0 && isFiltered) {
			return []
		} else {
			return store.allpatientData.slice(0, rowsPerPage)
		}
	}

	return (
		<div>
			<Row className={'d-flex align-items-start justify-content-start'}>
				<Col md='6' sm='12'>
					<Card>
						<CardHeader>
							<CardTitle tag='h4'>Search Filter</CardTitle>
						</CardHeader>
						<CardBody>
							<Row>
								<Col className={'mb-1'} md='6' sm='12'>
									<Select
										theme={selectThemeColors}
										className='react-select'
										classNamePrefix='select'
										options={officeOptions}
										value={currentOffice}
										onChange={data => {
											setCurrentOffice(data)
											dispatch(
												getPatientData({
													page: currentPage,
													perPage: rowsPerPage,
													office: data.value,
													complain: currentComplain,
													patientID: currentPatientID,
													patientName: currentPatientName,
													q: searchTerm
												})
											)
										}}
										isClearable={true}
										isSearchable={false}
									/>
								</Col>
								<Col className={'mb-1'} md='6' sm='12'>
									<Input type="text" id="chiefComplain" name="chiefComplain"
										placeholder="Chief Complain"
										value={currentComplain || ''}
										className='form-control'
										onChange={e => {
											setCurrentComplain(e.target.value)
											setCurrentOffice(e.target.value)
											dispatch(
												getPatientData({
													page: currentPage,
													perPage: rowsPerPage,
													office: currentOffice.value,
													complain: e.target.value,
													patientID: currentPatientID,
													patientName: currentPatientName,
													q: searchTerm
												})
											)
										}}
									/>
								</Col>
								<Col className={'mb-1'} md='6' sm='12'>
									<Input type="text" id="patientName" name="patientName"
										placeholder="Patient Name"
										value={currentPatientName || ''}
										className='form-control'
										onChange={e => {
											setCurrentPatientName(e.target.value)
											dispatch(
												getPatientData({
													page: currentPage,
													perPage: rowsPerPage,
													office: currentOffice.value,
													complain: currentComplain,
													patientID: currentPatientID,
													patientName: e.target.value,
													q: searchTerm
												})
											)
										}}
									/>
								</Col>
								<Col className={'mb-1'} md='6' sm='12'>
									<Input type="text" id="patientID" name="patientID"
										placeholder="Patient ID"
										value={currentPatientID || ''}
										className='form-control'
										onChange={e => {
											setCurrentPatientID(e.target.value)
											dispatch(
												getPatientData({
													page: currentPage,
													perPage: rowsPerPage,
													office: currentOffice.value,
													complain: currentComplain,
													patientID: e.target.value,
													q: searchTerm
												})
											)
										}}
									/>
								</Col>
								<Col className={'d-flex align-items-end justify-content-end mb-1'}>
									<Button color='primary'>
										Search
									</Button>
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
									searchTerm={searchTerm}
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

export default PatientSearchTable
