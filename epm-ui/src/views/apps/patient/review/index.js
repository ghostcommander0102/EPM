// ** User List Component
import PatientReviewTable from './PatientReviewTable'

// ** Styles
import '@styles/react/apps/app-users.scss'


const PatientReview = () => {
  return (
    <div className='patient-search-list'>
      <PatientReviewTable />
    </div>
  )
}

export default PatientReview
