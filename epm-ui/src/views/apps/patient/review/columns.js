// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'


// ** Store & Actions
import { getReview, deleteReview } from '../store/actions'
import { store } from '@store/storeConfig/store'


// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'


// ** Renders Client Columns
const renderSex = row => {
  const states = ['light-primary', 'light-danger'],
    color = (row.profile?.sex.includes("f")) ? states[0] : states[1]

  return <Avatar color={color || 'primary'} className='mr-1' content={row.profile?.sex || 'M'} initials />
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
            to={`/patients/review/${row.profile?.id}`}
            id={row.profile?.id}
            className='user-name text-truncate mb-0'
            onClick={() => store.dispatch(getReview(row.profile?.id))}
          >
            <span className='text-capitalize font-weight-bold'>{row.profile?.first_name?.concat(" ", row.profile?.last_name)}</span>
          </Link>
        </div>
        <div>
          {renderSex(row)}
        </div>
      </div>
    )
  },
  {
    name: 'ID',
    minWidth: '10px',
    selector: 'id',
    sortable: true,
    cell: row => row.profile?.id
  },
  {
    name: 'D.O.B',
    minWidth: '130px',
    selector: 'dob',
    sortable: true,
    cell: row => row.profile?.date_of_birth
  },
  {
    name: 'PRIMARY PHONE',
    minWidth: '170px',
    selector: 'primaryPhone',
    sortable: true,
    cell: row => row.profile?.phone_home
  },
  {
    name: 'EMAIL',
    minWidth: '200px',
    selector: 'email',
    sortable: true,
    cell: row => (
      <span>{row.profile?.email || ''}</span>
    )
  },
  {
    name: 'ADDRESS',
    minWidth: '300px',
    selector: 'address',
    sortable: true,
    cell: row => (
      <span className='text-capitalize'>{row.profile?.address}</span>
    )
  },
  {
    name: 'CITY',
    minWidth: '120px',
    selector: 'city',
    sortable: true,
    cell: row => row.profile?.city
  },
  {
    name: 'STATE',
    minWidth: '100px',
    selector: 'state',
    sortable: true,
    cell: row => row.profile?.state
  },
  {
    name: 'race',
    minWidth: '170px',
    selector: 'race',
    sortable: true,
    cell: row => row.information?.race
  },
  {
    name: 'MARITAL',
    minWidth: '170px',
    selector: 'marital',
    sortable: true,
    cell: row => row.information?.marital || ''
  },
  {
    name: 'LANGUAGE',
    minWidth: '170px',
    selector: 'language',
    sortable: true,
    cell: row => row.information?.language
  },
  {
    name: 'Primary Care Physician',
    minWidth: '170px',
    selector: 'pcp_name',
    sortable: true,
    cell: row => row.information?.pcp_facility_name || ""
  },
  {
    name: 'EMPLOYER',
    minWidth: '170px',
    selector: 'employer',
    sortable: true,
    cell: row => row.information?.employer_name
  },
  {
    name: 'OCCUPATION',
    minWidth: '170px',
    selector: 'occupation',
    sortable: true,
    cell: row => row.information?.employer_occupation
  },
  {
    name: 'REFERRED BY',
    minWidth: '170px',
    selector: 'referred_by',
    sortable: true,
    cell: row => row.information?.referred_by
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
            to={`/apps/patient/view/${row.profile?.id}`}
            className='w-100'
            onClick={() => store.dispatch(getReview(row.profile?.id))}
          >
            <FileText size={14} className='mr-50' />
            <span className='align-middle'>Review</span>
          </DropdownItem>
          <DropdownItem className='w-100' onClick={() => store.dispatch(deleteReview(row.profile?.id))}>
            <Trash2 size={14} className='mr-50' />
            <span className='align-middle'>Delete</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
]
