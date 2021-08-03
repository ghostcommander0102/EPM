// ** Third Party Components

import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle } from 'reactstrap'
import React from "react"


// ** Table Columns
const columns = [
  {
    name: 'No.',
    selector: 'id',
    sortable: true,
    maxWidth: '50px'
  },
  {
    name: 'Patient Name',
    selector: 'patient_name',
    sortable: true,
    minWidth: '200px',
    cell: row => <span className={'font-weight-bold'}>{row.patient_name}</span>
  },
  {
    name: 'Room No.',
    selector: 'room_id',
    sortable: true,
    minWidth: '150px',
    cell: row => <span>{row.room_id}</span>
  },
  {
    name: 'D.O.B',
    selector: 'dob',
    sortable: false,
    minWidth: '150px'
  },
  {
    name: 'Provider',
    selector: 'provider',
    sortable: false,
    minWidth: '200px',
    cell: row => <span className={'font-weight-bold text-primary'}>{row.patient_name}</span>
  },
  {
    name: 'Time of Admit',
    selector: 'time_of_admit',
    sortable: false,
    minWidth: '150px'
  },
  {
    name: 'Chief Complain',
    selector: 'chief_complain',
    sortable: false,
    minWidth: '200px',
    cell: row => <span className={'font-weight-bold'}>{row.chief_complain}</span>
  }
]

const data = [
  {
    id: '001',
    patient_name: 'Abraham Violet',
    room_id: '112',
    dob: '01/05/1990',
    provider: 'Dr. James Foley',
    time_of_admit: '12:45 AM',
    chief_complain: 'Influenza'
  },
  {
    id: '002',
    patient_name: 'Anthony Burgess',
    room_id: '213',
    dob: '07/11/1965',
    provider: 'Dr. Cavin Fox',
    time_of_admit: '09:30 AM',
    chief_complain: 'Cholera'
  },
  {
    id: '003',
    patient_name: 'Christian Butler',
    room_id: '211',
    dob: '03/09/2000',
    provider: 'Dr. James Foley',
    time_of_admit: '10:15 AM',
    chief_complain: 'Jaundice'
  },
  {
    id: '004',
    patient_name: 'Edward Dyer',
    room_id: '210',
    dob: '11/05/1983',
    provider: 'Dr. James Foley',
    time_of_admit: '12:00 AM',
    chief_complain: 'Corona'
  }
]

// ** Table Zero Config Column
const DataTableEmergencyRoom = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4' className={'font-weight-bold'}>Emergency Room</CardTitle>
      </CardHeader>
      <DataTable
        noHeader
        pagination
        data={data}
        columns={columns}
        className='react-dataTable'
        sortIcon={<ChevronDown size={10} />}
        // paginationPerPage={7}
        // paginationDefaultPage={currentPage + 1}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
      />
    </Card>
  )
}

export default DataTableEmergencyRoom
