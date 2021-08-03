import mock from '../mock'
import { paginateArray } from '../utils'

import data from "./patients.json"

// GET ALL PATIENT DATA
mock.onGet('/api/patients/list/all-data').reply(200, data.patients)

// POST: Add new Patient
mock.onPost('/api/patients/add-patient').reply(config => {
    // Get event from post data
    const patient = JSON.parse(config.data)

    const { length } = data.patients
    let lastIndex = 0
    if (length) {
        lastIndex = data.patients[length - 1].pid
    }
    patient.pid = lastIndex + 1

    data.patients.unshift(patient)

    return [201, { patient }]
})

// GET Updated Patient
mock.onGet('/api/patients/list/data').reply(config => {
    const { q = '', perPage = 10, page = 1, role = null, currentPlan = null, status = null } = config

    /* eslint-disable  */
    const queryLowered = q.toLowerCase()
    const filteredData = data.patients.filter(
        patient =>
            (patient.firstName.toLowerCase().includes(queryLowered) || patient.lastName.toLowerCase().includes(queryLowered)) &&
            patient.role === (role || patient.role) &&
            patient.currentPlan === (currentPlan || patient.currentPlan) &&
            patient.state === (status || patient.state)
    )
    /* eslint-enable  */

    return [
        200,
        {
            patients: paginateArray(filteredData, perPage, page),
            total: filteredData.length
        }
    ]
})

// GET Patient
mock.onGet('/api/patients/patient').reply(config => {
    const { pid } = config
    const patient = data.patients.find(i => i.pid === pid)
    return [200, { patient }]
})

// DELETE: Deletes patient
mock.onDelete('/api/patients/delete').reply(config => {
    // Get user id from URL
    let patientId = config.pid

    // Convert Id to number
    patientId = Number(patientId)

    const patientIndex = data.patients.findIndex(t => t.pid === patientId)
    data.patients.splice(patientIndex, 1)

    return [200]
})
