export const baseURL = process.env.REACT_APP_API_BASE_URL
export default {
  addReviewEndpoint: `${baseURL}/patient/temp/profiles/`,

  getAllReviewDataEndpoint: `${baseURL}/patient/temp/profiles/`,
  getReviewDataEndpoint:    `${baseURL}/patient/temp/profiles/`,
  getReviewEndpoint:        `${baseURL}/patient/temp/profiles/`,   // <id>/
  deleteReviewEndpoint: `${baseURL}/patient/temp/profiles/`,   // <id>/

  addPatientEndpoint: `${baseURL}/patient/profiles/`,

  getAllPatientDataEndpoint: `${baseURL}/patient/profiles/`,
  getPatientDataEndpoint:    `${baseURL}/patient/profiles/`,
  getPatientEndpoint: `${baseURL}/patient/profiles/`, // <id>/
  deletePatientEndpoint: `${baseURL}/patient/profiles/`  // <id>/
}
