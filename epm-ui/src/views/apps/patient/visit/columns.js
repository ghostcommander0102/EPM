// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'


// ** Store & Actions
import { getPatient, deletePatient } from '../store/actions'
import { store } from '@store/storeConfig/store'


// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'


// ** Renders Client Columns
const renderSex = row => {
  const states = ['light-primary', 'light-danger'],
    color = (row.sex.includes("f")) ? states[0] : states[1]

  return <Avatar color={color || 'primary'} className='mr-1' content={row.sex || 'M'} initials />
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
            to={`/apps/user/view/${row.id}`}
            className='user-name text-truncate mb-0'
            onClick={() => store.dispatch(getPatient(row.pid))}
          >
            <span className='text-capitalize font-weight-bold'>{row.first_name.concat(" ", row.last_name)}</span>
          </Link>
        </div>
        <div>
          {renderSex(row)}
        </div>
      </div>
    )
  },
  {
    name: 'D.O.B',
    minWidth: '130px',
    selector: 'dob',
    sortable: true,
    cell: row => row.dob
  },
  {
    name: 'PRIMARY PHONE',
    minWidth: '100px',
    selector: 'primaryPhone',
    sortable: true,
    cell: row => row.phone_work
  },
  {
    name: 'SSN',
    minWidth: '100px',
    selector: 'ssn',
    sortable: true,
    cell: row => (
        <span className='text-capitalize'>{row.ssn}</span>
    )
  },
  {
    name: 'CHART',
    minWidth: '70px',
    selector: 'chart',
    sortable: true,
    cell: row => (
        <span className='text-capitalize'>{row.chart}</span>
    )
  },
  {
    name: 'INSURANCE VERIFICATION',
    minWidth: '70px',
    selector: 'insuranceVerification',
    sortable: true,
    cell: row => row.insuranceVerification || ''
  },
  {
    name: 'TRACE TIME',
    minWidth: '70px',
    selector: 'traceTime',
    sortable: true,
    cell: row => row.traceTime || ''
  },
  {
    name: 'DISCHARGE TIME',
    minWidth: '70px',
    selector: 'dischargeTime',
    sortable: true,
    cell: row => row.dischargeTime || ''
  },
  {
    name: 'PATIENT ID',
    minWidth: '320px',
    selector: 'patient_id',
    sortable: true,
    cell: row => row.pid
  },
  {
    name: 'ACTION',
    minWidth: '70px',
    cell: row => (
      <UncontrolledDropdown>
        <DropdownToggle tag='div' className='btn btn-sm'>
          <MoreVertical size={14} className='cursor-pointer' />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            tag={Link}
            // to={`/apps/patient/view/${row.id}`}
            className='w-100'
            // onClick={() => store.dispatch(getPatient(row.id))}
          >
            <FileText size={14} className='mr-50' />
            <span className='align-middle'>Details</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
]
