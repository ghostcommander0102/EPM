import React, {useState} from "react"

// ** Third Party Components
import {Archive, ChevronDown, Edit, FileText, MoreVertical, Trash} from 'react-feather'
import DataTable from 'react-data-table-component'
import {Card, CardHeader, CardTitle, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap'
import ReactPaginate from "react-paginate"


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
                  <small className={'text-primary'}>{row.checked_out}</small>
              </div>
          </div>
        )
    }
]

const data = [
    {patient: 'Meghann Bodechon', checked_out: '12:40 PM'},
    {patient: 'Moshe De Ambrosis', checked_out: '12:41 PM'},
    {patient: 'Had Chatelot', checked_out: '12:42 PM'},
    {patient: 'Georgia McCrum', checked_out: '12:43 PM'},
    {patient: 'Krishnah Stilldale', checked_out: '12:44 PM'},
    {patient: 'Edvard Dixsee', checked_out: '12:45 PM'},
    {patient: 'Marco Pennings', checked_out: '12:46 PM'},
    {patient: "Tommie O'Corr", checked_out: '12:47 PM'},
    {patient: 'Cybill Poyle', checked_out: '12:48 PM'},
    {patient: 'Wendi Somerlie', checked_out: '12:49 PM'},
    {patient: 'Ferdie Georgeon', checked_out: '12:50 PM'},
    {patient: 'Holly Edgworth', checked_out: '12:51 PM'},
    {patient: 'Marco Pennings', checked_out: '12:46 PM'},
    {patient: "Tommie O'Corr", checked_out: '12:47 PM'},
    {patient: 'Cybill Poyle', checked_out: '12:48 PM'},
    {patient: 'Wendi Somerlie', checked_out: '12:49 PM'},
    {patient: 'Ferdie Georgeon', checked_out: '12:50 PM'}
]

// ** Table Zero Config Column
const DataTableDischarged = () => {
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
                <CardTitle tag='h4'>Discharged</CardTitle>
            </CardHeader>
            <DataTable
                noHeader
                pagination
                data={data}
                borderless
                columns={columns}
                paginationPerPage={5}
                className='react-dataTable'
                sortIcon={<ChevronDown size={10}/>}
                paginationDefaultPage={currentPage + 1}
                paginationRowsPerPageOptions={[10, 25, 50, 100]}
                paginationComponent={CustomPagination}
            />
        </Card>
    )
}

export default DataTableDischarged
