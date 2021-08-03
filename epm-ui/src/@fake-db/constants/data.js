// ** Third Party Components
import axios from 'axios'

export let patientsData

// ** Get initial Data
// axios.get('/api/patients/initial-data').then(response => {
//   patientsData = response.data
// })


const sortByKey = (array, key) => {
  return array.sort(function(a, b) {
    const x = a[key]
    const y = b[key]
    return ((x < y) ? -1 : ((x > y) ? 1 : 0))
  })
}


import insurance_types_data from "./US_insurance_types.json"
const createInsuranceTypeOptions = () => {
  const _insuranceTypeOptions = []
  for (let i = 0; i < insurance_types_data['insuranceTypes'].length; i++) {
    _insuranceTypeOptions.push({value: insurance_types_data['insuranceTypes'][i], label: insurance_types_data['insuranceTypes'][i]})
  }
  return sortByKey(_insuranceTypeOptions, 'label')
}
export const insuranceTypeOptions = createInsuranceTypeOptions()


import states_data from "./US_States_and_Cities.json"
const createStateCityOptions = () => {
  const _usStateOptions = []
  const _usCityOptions = []
  for (const state in states_data) {
    _usStateOptions.push({value: state, label: state})
    for (let i = 0; i < states_data[state].length; i++) {
      _usCityOptions.push({value: states_data[state][i], label: states_data[state][i]})
    }
  }
  return [sortByKey(_usStateOptions, 'label'), sortByKey(_usCityOptions, 'label')]
}
export const [usStateOptions, usCityOptions] = createStateCityOptions()


import data from "./sample_requests.json"
export const sampleFormData = data
