// ** React Imports
import { Fragment } from 'react'

import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { deleteDocument } from '../store/actions'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import {
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  UncontrolledTooltip
} from 'reactstrap'
import {
  Eye,
  TrendingUp,
  Send,
  MoreVertical,
  Download,
  Edit,
  Trash,
  Copy,
  CheckCircle,
  Save,
  ArrowDownCircle,
  Info,
  PieChart
} from 'react-feather'

// ** Vars
const documentStatus = {
  Sent: { color: 'light-secondary', icon: Send },
  Paid: { color: 'light-success', icon: CheckCircle },
  Draft: { color: 'light-primary', icon: Save },
  Downloaded: { color: 'light-info', icon: ArrowDownCircle },
  'Past Due': { color: 'light-danger', icon: Info },
  'Partial Payment': { color: 'light-warning', icon: PieChart }
}

// ** Renders Client Columns
const renderGender = row => {
  const states = ['light-primary', 'light-danger'],
    color = (row.gender.includes("F")) ? states[0] : states[1]

  return <Avatar color={color || 'primary'} className='mr-1' content={row.gender || 'M'} initials />
}

// ** Table columns
export const columns = [
  {
    name: 'FULL NAME',
    minWidth: '270px',
    selector: 'fullName',
    sortable: true,
    cell: row => (
      <div className='d-flex align-items-center'>
        <div className='d-flex flex-column justify-content-between mr-2'>
          <Link
            to={`/document/preview/${row.pid}`}
            className='user-name text-truncate mb-0'
            // onClick={() => store.dispatch(getPatient(row.pid))}
          >
            <span className='text-capitalize font-weight-bold'>{row.firstName.concat(" ", row.lastName)}</span>
          </Link>
        </div>
        <div>
          {renderGender(row)}
        </div>
      </div>
    )
  },
  {
    name: 'D.O.B',
    minWidth: '70px',
    selector: 'dob',
    sortable: true,
    cell: row => row.dob
  },
  {
    name: 'AGE',
    minWidth: '50px',
    selector: 'age',
    sortable: true,
    cell: row => row.age
  },
  {
    name: 'PRIMARY PHONE',
    minWidth: '100px',
    selector: 'primaryPhone',
    sortable: true,
    cell: row => row.ssn
  },
  {
    name: 'RACE',
    minWidth: '50px',
    selector: 'race',
    sortable: true,
    cell: row => row.race
  },
  {
    name: 'PRIMARY PROVIDER',
    minWidth: '150px',
    selector: 'primaryProvider',
    sortable: true,
    cell: row => row.primaryProvider
  },
  {
    name: 'SECONDARY PROVIDER',
    minWidth: '150px',
    selector: 'secondaryProvider',
    sortable: true,
    cell: row => row.secondaryProvider
  },
  {
    name: 'PATIENT ID',
    minWidth: '200px',
    selector: 'patientID',
    sortable: true,
    cell: row => row.pid
  },
  {
    name: 'Action',
    minWidth: '110px',
    selector: '',
    sortable: true,
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        {/*<Send size={17} id={`send-tooltip-${row.id}`} />*/}
        {/*<UncontrolledTooltip placement='top' target={`send-tooltip-${row.id}`}>*/}
        {/*  Send Mail*/}
        {/*</UncontrolledTooltip>*/}
        {/*<Link to={`/apps/invoice/preview/${row.id}`} id={`pw-tooltip-${row.id}`}>*/}
        {/*  <Eye size={17} className='mx-1' />*/}
        {/*</Link>*/}
        {/*<UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>*/}
        {/*  Preview Invoice*/}
        {/*</UncontrolledTooltip>*/}
        <UncontrolledDropdown>
          <DropdownToggle tag='span'>
            <MoreVertical size={17} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem tag='a' href='/' className='w-100' onClick={(e) => {
              e.preventDefault()
              const file_path = '/Marjory Sicely.pdf'
              const a = document.createElement('A')
              a.href = file_path
              a.download = file_path.substr(file_path.lastIndexOf('/') + 1)
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)
            }}>
              <Download size={14} className='mr-50'/>
              <span className='align-middle'>Download</span>
            </DropdownItem>
            {/*<DropdownItem tag={Link} to={`/apps/invoice/edit/${row.id}`} className='w-100'>*/}
            {/*  <Edit size={14} className='mr-50' />*/}
            {/*  <span className='align-middle'>Edit</span>*/}
            {/*</DropdownItem>*/}
            {/*<DropdownItem*/}
            {/*  tag='a'*/}
            {/*  href='/'*/}
            {/*  className='w-100'*/}
            {/*  onClick={e => {*/}
            {/*    e.preventDefault()*/}
            {/*    store.dispatch(deleteDocument(row.id))*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <Trash size={14} className='mr-50' />*/}
            {/*  <span className='align-middle'>Delete</span>*/}
            {/*</DropdownItem>*/}
            {/*<DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>*/}
            {/*  <Copy size={14} className='mr-50' />*/}
            {/*  <span className='align-middle'>Duplicate</span>*/}
            {/*</DropdownItem>*/}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
