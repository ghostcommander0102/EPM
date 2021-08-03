// ** User List Component
import PatientSearchTable from './PatientSearchTable'

// ** Styles
import '@styles/react/apps/app-users.scss'


const PatientSearch = () => {
  return (
    <div className='patient-search-list'>
      <PatientSearchTable />
    </div>
  )
}

export default PatientSearch
