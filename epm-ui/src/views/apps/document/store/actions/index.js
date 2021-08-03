import axios from 'axios'

// ** Get data
export const getData = params => {
  return dispatch => {
    axios.get('/api/document/documents', params).then(response => {
      dispatch({
        type: 'GET_DATA',
        allData: response.data.allData,
        data: response.data.documents,
        totalPages: response.data.total,
        params
      })
    })
  }
}

// ** Delete Invoice
export const deleteDocument = id => {
  return (dispatch, getStore) => {
    axios
      .delete('/api/document/delete', { id })
      .then(response => {
        dispatch({
          type: 'DELETE_DOCUMENT'
        })
      })
      .then(() => dispatch(getData(getStore().invoice.params)))
  }
}
