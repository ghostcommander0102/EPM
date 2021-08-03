import Avatar from '@components/avatar'
import React, {useState} from "react"

import {Archive, ChevronDown, Edit, FileText, MoreVertical, Trash} from 'react-feather'
import {Card, CardHeader, CardTitle, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap'
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"


// ** Table Columns
const columns = [
    {
        name: 'Task',
        selector: 'task',
        sortable: false,
        minWidth: '300px'
    },
    {
        name: 'Assign',
        selector: 'assign',
        sortable: false,
        maxWidth: '150px',
        cell: row => (
            <div className='d-flex align-items-center'>
                {row.avatar === '' ? (
                    <Avatar color={`light-success`} content={row.assign} initials />
                ) : (
                    <Avatar img={require(`@src/assets/images/portrait/small/avatar-s-${row.avatar}`).default} />
                )}
                <div className='user-info text-truncate ml-1'>
                    <span className='d-block font-weight-bold text-truncate'>{row.assign}</span>
                    <small>{row.post}</small>
                </div>
            </div>
        )
    },
    {
        name: 'Actions',
        allowOverflow: true,
        maxWidth: '50px',
        cell: row => {
            return (
                <div className='d-flex'>
                    <UncontrolledDropdown>
                        <DropdownToggle className='pr-1' tag='span'>
                            <MoreVertical size={15} />
                        </DropdownToggle>
                        {/*<DropdownMenu right>*/}
                        {/*    <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>*/}
                        {/*        <FileText size={15} />*/}
                        {/*        <span className='align-middle ml-50'>Details</span>*/}
                        {/*    </DropdownItem>*/}
                        {/*    <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>*/}
                        {/*        <Archive size={15} />*/}
                        {/*        <span className='align-middle ml-50'>Archive</span>*/}
                        {/*    </DropdownItem>*/}
                        {/*    <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>*/}
                        {/*        <Trash size={15} />*/}
                        {/*        <span className='align-middle ml-50'>Delete</span>*/}
                        {/*    </DropdownItem>*/}
                        {/*</DropdownMenu>*/}
                    </UncontrolledDropdown>
                </div>
            )
        }
    }
]

const data = [
    {task:'Send unpaid patients too collections', assign: 'JD', avatar:'1.jpg'},
    {task:'Send unpaid patients too collections', assign: 'FA', avatar:''},
    {task:'Send unpaid patients too collections', assign: 'JD', avatar:'2.jpg'},
    {task:'Send unpaid patients too collections', assign: 'FA', avatar:''},
    {task:'Send unpaid patients too collections', assign: 'JD', avatar:'3.jpg'},
    {task:'Send unpaid patients too collections', assign: 'JD', avatar:''},
    {task:'Send unpaid patients too collections', assign: 'FA', avatar:'4.jpg'},
    {task:'Send unpaid patients too collections', assign: 'JD', avatar:''},
    {task:'Check Insurance Eligibility', assign: 'SB', avatar:'5.jpg'},
    {task:'Send unpaid patients too collections', assign: 'JD', avatar:''},
    {task:'Send unpaid patients too collections', assign: 'FA', avatar:''},
    {task:'Send unpaid patients too collections', assign: 'JD', avatar:'6.jpg'},
    {task:'Check Insurance Eligibility', assign: 'SB', avatar:'7.jpg'},
    {task:'Check Insurance Eligibility', assign: 'SB', avatar:''},
    {task:'Check Insurance Eligibility', assign: 'SB', avatar:''},
    {task:'Check Insurance Eligibility', assign: 'SB', avatar:'8.jpg'},
    {task:'Check Insurance Eligibility', assign: 'SB', avatar:''},
    {task:'Check Insurance Eligibility', assign: 'SB', avatar:''}
]

// ** Table Zero Config Column
const DataPendingTask = () => {
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
                <CardTitle tag='h4'>Pending Task</CardTitle>
            </CardHeader>
            <DataTable
                noHeader
                pagination
                data={data}
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

export default DataPendingTask
