// **  Initial State
const initialState = {
  patientdata: [],
  data: [],
  total: 0,
  params: {},
  allData: [],
  allpatientData: [],
  patienttotal: 0,
  reviews: []
}

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECTED_DATA':
      return {
        ...state,
        selectedData: action.selectedData
      }

    case 'GET_ALL_REVIEW_DATA':
      return {
        ...state,
        allData: action.data.items
      }
    case 'GET_REVIEW_DATA':
      return {
        ...state,
        data: action.data.items,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_REVIEW':
      return {
        ...state,
        data: action.selectedPatient,
        params: action.params
      }
    case 'DELETE_REVIEW':
      return {
        ...state,
        data: action.data.items,
        total: action.totalPages,
        params: action.params
      }

    case 'GET_ALL_PATIENT_DATA':
      return {
        ...state,
        allpatientData: action.data.items
      }
    case 'GET_PATIENT_DATA':
      return {
        ...state,
        patientdata: action.data.items,
        patienttotal: action.totalPages,
        params: action.params
      }
    case 'GET_PATIENT':
      return {
        ...state,
        patientdata: action.data.items,
        patienttotal: action.totalPages,
        params: action.params
      }
    default:
      return state
  }
}

export default patientReducer
