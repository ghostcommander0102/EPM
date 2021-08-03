import axios from "axios"
import apiEndpoints from '@src/services/apis'


export const addReview = (...args) => {
	return axios.post(apiEndpoints.addReviewEndpoint, ...args)
}


// ** Get all Patient Review Data
export const getAllReviewData = () => {
	return async dispatch => {
		await axios.get(apiEndpoints.getAllReviewDataEndpoint).then(response => {
			dispatch({
				type: 'GET_ALL_REVIEW_DATA',
				data: response.data
			})
		})
	}
}

// ** Get data on page or row change
export const getReviewData = params => {
	return async dispatch => {
		await axios.get(apiEndpoints.getAllReviewDataEndpoint, params).then(response => {
			dispatch({
				type: 'GET_REVIEW_DATA',
				data: response.data,
				totalPages: response.data.total
			})
		})
	}
}


export const deleteReview = pid => {
	return (dispatch, getState) => {
		console.log("url:", `${apiEndpoints.deleteReviewEndpoint}${pid}/`)
		axios
			.delete(`${apiEndpoints.deleteReviewEndpoint}${pid}/`)
			.then(response => {
				dispatch({
					type: 'DELETE_REVIEW'
				})
			})
			.then(() => {
				dispatch(getReviewData(getState().patients.params))
				dispatch(getAllReviewData())
			})
	}
}

export const getReview = pid => {
	return async dispatch => {
		await axios
			.put(apiEndpoints.getReviewEndpoint, {
				id: pid
			})
			.then(response => {
				dispatch({
					type: 'GET_REVIEW',
					selectedPatient: response.data
				})
			})
			.catch(err => console.log(err))
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ** Get all Data
export const getAllPatientData = () => {
	return async dispatch => {
		await axios.get(apiEndpoints.getAllPatientDataEndpoint).then(response => {
			dispatch({
				type: 'GET_ALL_PATIENT_DATA',  // 'GET_ALL_DATA',
				data: response.data
			})
			// console.log(response.data.patients)
		})
	}
}

// ** Get data on page or row change
export const getPatientData = params => {
	return async dispatch => {
		await axios.get(apiEndpoints.getPatientDataEndpoint, params).then(response => {
			dispatch({
				type: 'GET_PATIENT_DATA', // 'GET_DATA',
				data: response.data,
				totalPages: response.data.total,
				params
			})
			// console.log(response.data.patients)
		})
	}
}

// ** Get patient
export const getPatient = pid => {
	return async dispatch => {
		await axios
			.get(apiEndpoints.getPatientEndpoint, { pid })
			.then(response => {
				dispatch({
					type: 'GET_PATIENT',
					selectedPatient: response.data.patient
				})
			})
			.catch(err => console.log(err))
	}
}

// ** Add new patient
export const addPatient = (...args) => {
	return axios.post(apiEndpoints.addPatientEndpoint, ...args)
}

// ** Delete patient
export const deletePatient = pid => {
	return (dispatch, getState) => {
		axios
			.delete(`/apps/patients/delete/${pid}`)
			.then(response => {
				dispatch({
					type: 'DELETE_PATIENT'
				})
			})
			.then(() => {
				dispatch(getPatientData(getState().patients.params))
				dispatch(getAllPatientData())
			})
	}
}
