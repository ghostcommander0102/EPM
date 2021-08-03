import React, {useState} from "react"

// ** Third Party Components
import {ChevronDown} from 'react-feather'
import DataTable from 'react-data-table-component'
import {Card, CardHeader, CardTitle} from 'reactstrap'
import ReactPaginate from 'react-paginate'
import ExpandableTable from "../tables/data-tables/data"


// ** Table Columns
const columns = [
    {
        name: 'Patient',
        selector: 'patient',
        sortable: true,
        maxWidth: '250px',
        cell: row => (
          <div className='d-flex align-items-center'>
              <div className='user-info text-truncate ml-1'>
                  <span className='d-block font-weight-bold text-truncate'>{row.patient}</span>
                  <small>{row.checked_in}</small>
              </div>
          </div>
        )
    },
    {
        name: 'Waiting Time',
        selector: 'waiting_time',
        sortable: false,
        minWidth: '100px'
    }
]

const data = [
    {patient: 'Samantha Caprio', checked_in: '12:32 PM', waiting_time: '1 mins'},
    {patient: 'Samantha Caprio', checked_in: '12:32 PM', waiting_time: '2 mins'},
    {patient: 'Samantha Caprio', checked_in: '12:32 PM', waiting_time: '3 mins'},
    {patient: 'Samantha Caprio', checked_in: '12:32 PM', waiting_time: '4 mins'},
    {patient: 'Samantha Caprio', checked_in: '12:32 PM', waiting_time: '5 mins'},
    {patient: 'Samantha Caprio', checked_in: '12:32 PM', waiting_time: '6 mins'},
    {patient: 'Samantha Caprio', checked_in: '12:32 PM', waiting_time: '7 mins'},
    {patient: 'Samantha Caprio', checked_in: '12:32 PM', waiting_time: '8 mins'},
    {patient: 'Samantha Caprio', checked_in: '12:32 PM', waiting_time: '9 mins'},
    {patient: 'Samantha Caprio', checked_in: '12:32 PM', waiting_time: '10 mins'},
    {patient: 'Samantha Caprio', checked_in: '12:32 PM', waiting_time: '20 mins'},
    {patient: 'Samantha Caprio', checked_in: '12:32 PM', waiting_time: '30 mins'},
    {patient: 'Samantha Caprio', checked_in: '12:32 PM', waiting_time: '40 mins'},
    {patient: 'Samantha Caprio', checked_in: '12:32 PM', waiting_time: '50 mins'},
    {patient: 'Samantha Caprio', checked_in: '12:32 PM', waiting_time: '60 mins'},
    {patient: 'Samantha Caprio', checked_in: '12:32 PM', waiting_time: '110 mins'},
    {patient: 'Samantha Caprio', checked_in: '12:32 PM', waiting_time: '120 mins'},
    {patient: 'Samantha Caprio', checked_in: '12:32 PM', waiting_time: '130 mins'},
    {patient: 'Samantha Caprio', checked_in: '12:32 PM', waiting_time: '140 mins'}
]

// ** Table Zero Config Column
const DataTableWaitingRoom = () => {
// ** State
    const [currentPage, setCurrentPage] = useState(0)

    // ** Function to handle filter
    const handlePagination = page => {
        setCurrentPage(page.selected)
    }

    // ** Custom Pagination
    const CustomPagination = () => (
        <ReactPaginate
            previousLabel={''}
            nextLabel={''}
            forcePage={currentPage}
            onPageChange={page => handlePagination(page)}
            pageCount={10}
            breakLabel={'...'}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName={'active'}
            pageClassName={'page-item'}
            nextLinkClassName={'page-link'}
            nextClassName={'page-item next'}
            previousClassName={'page-item prev'}
            previousLinkClassName={'page-link'}
            pageLinkClassName={'page-link'}
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName={'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1'}
        />
    )
    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Waiting Room</CardTitle>
            </CardHeader>
            <DataTable
                noHeader
                pagination
                // subHeader
                // responsive
                data={data}
                columns={columns}
                className='react-dataTable'
                paginationPerPage={5}
                sortIcon={<ChevronDown size={10}/>}
                paginationDefaultPage={currentPage + 1}
                expandableRowsComponent={<ExpandableTable/>}
                paginationRowsPerPageOptions={[10, 25, 50, 100]}
                paginationComponent={CustomPagination}
            />
        </Card>
    )
}

export default DataTableWaitingRoom
