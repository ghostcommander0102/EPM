// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { getPatient, deletePatient } from '../store/actions'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, FileText, Trash2, Archive } from 'react-feather'
import SignatureCanvas from 'react-signature-canvas'
// ** Renders Client Columns
const renderClient = row => {
	const stateNum = Math.floor(Math.random() * 6),
		states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
		color = states[stateNum]

	return <Avatar color={color || 'primary'} className='mr-1' content={row.firstName || 'John Doe'} initials />
}

// ** Renders Client Columns
const renderSex = row => {
	const states = ['light-primary', 'light-danger'],
		color = (row.profile.sex.includes("F")) ? states[0] : states[1]

	return <Avatar color={color || 'primary'} className='mr-1' content={row.gender || 'M'} initials />
}

export const columns = [
	{
		name: 'PATIENT NAME',
		minWidth: '270px',
		selector: 'fullName',
		sortable: true,
		cell: row => (
			<div className='d-flex align-items-center'>
				<div className='d-flex flex-column justify-content-between mr-2'>
					<Link
						to={`/apps/user/view/${row.profile.id}`}
						className='user-name text-truncate mb-0'
						onClick={() => store.dispatch(getPatient(row.profile.id))}
					>
						<span className='text-capitalize font-weight-bold'>{row.profile.first_name.concat(" ", row.profile.last_name)}</span>
					</Link>
				</div>
				<div>
					{renderSex(row)}
				</div>
			</div>
		)
	},
	{
		name: 'Signature',
		minWidth: '130px',
		selector: 'dob',
		sortable: true,
		cell: row => {
			return <img
				src={row.profile.signature}
				alt="my signature"
				style={{
					display: "block",
					margin: "0 auto",
					border: "1px solid black",
					width: "150px"
				}}
			/>
		}
	},
	{
		name: 'D.O.B',
		minWidth: '130px',
		selector: 'dob',
		sortable: true,
		cell: row => row.date_of_birth
	},
	{
		name: 'PRIMARY PHONE',
		minWidth: '170px',
		selector: 'primaryPhone',
		sortable: true,
		cell: row => row.profile.phone_home || ""
	},
	{
		name: 'EMAIL',
		minWidth: '120px',
		selector: 'email',
		sortable: true,
		cell: row => row.profile.email || ""
	},
	{
		name: 'SSN',
		minWidth: '130px',
		selector: 'ssn',
		sortable: true,
		cell: row => (
			<span>{row.profile.ssn || ""}</span>
		)
	},
	{
		name: 'ADDRESS',
		minWidth: '300px',
		selector: 'address',
		sortable: true,
		cell: row => row.profile.address
	},
	{
		name: 'CITY',
		minWidth: '120px',
		selector: 'city',
		sortable: true,
		cell: row => row.profile.city
	},
	{
		name: 'STATE',
		minWidth: '100px',
		selector: 'state',
		sortable: true,
		cell: row => row.profile.state
	},
	{
		name: 'ZIP',
		minWidth: '100px',
		selector: 'state',
		sortable: true,
		cell: row => row.profile.zip
	},
	{
		name: 'RACE',
		minWidth: '140px',
		selector: 'race',
		sortable: true,
		cell: row => (
			<span className='text-capitalize'>{row.information.race || ""}</span>
		)
	},
	{
		name: 'MARITAL',
		minWidth: '70px',
		selector: 'marital',
		sortable: true,
		cell: row => row.information.marital
	},
	{
		name: 'LANGUAGE',
		minWidth: '70px',
		selector: 'language',
		sortable: true,
		cell: row => row.information.language
	},
	{
		name: '',
		minWidth: '70px',
		cell: row => (
			<UncontrolledDropdown>
				<DropdownToggle tag='div' className='btn btn-sm'>
					<MoreVertical size={14} className='cursor-pointer' />
				</DropdownToggle>
				<DropdownMenu right>
					<DropdownItem
						tag={Link}
						to={`/apps/patient/view/${row.profile.id}`}
						className='w-100'
						onClick={() => store.dispatch(getPatient(row.profile.id))}
					>
						<FileText size={14} className='mr-50' />
						<span className='align-middle'>Details</span>
					</DropdownItem>
					<DropdownItem
						tag={Link}
						to={`/apps/patient/edit/${row.profile.id}`}
						className='w-100'
						onClick={() => store.dispatch(getPatient(row.profile.id))}
					>
						<Archive size={14} className='mr-50' />
						<span className='align-middle'>Edit</span>
					</DropdownItem>
					<DropdownItem className='w-100' onClick={() => store.dispatch(deletePatient(row.profile.id))}>
						<Trash2 size={14} className='mr-50' />
						<span className='align-middle'>Delete</span>
					</DropdownItem>
				</DropdownMenu>
			</UncontrolledDropdown>
		)
	}
]
