import mock from '../mock'
import { paginateArray, sortCompare } from '../utils'

import data from "./documents.json"

// ------------------------------------------------
// GET: Return Document List
// ------------------------------------------------


mock.onGet('/api/document/documents').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1, status = null } = config
  /* eslint-enable */

  const queryLowered = q.toLowerCase()
  const filteredData = data.documents.filter(
      doc =>
        /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
        (doc.firstName.toLowerCase().includes(queryLowered) ||
          doc.lastName.toLowerCase().includes(queryLowered)) &&
        doc.state.toLowerCase() === (status || doc.state)
    )
    .sort(sortCompare('id'))
    .reverse()
  /* eslint-enable  */

  return [
    200,
    {
      allData: data.documents,
      documents: paginateArray(filteredData, perPage, page),
      total: filteredData.length
    }
  ]
})

// ------------------------------------------------
// GET: Return Single Invoice
// ------------------------------------------------
mock.onGet(/\/api\/document\/documents\/\d+/).reply(config => {
  // // Get event id from URL
  const documentID = Number(config.url.substring(config.url.lastIndexOf('/') + 1))

  const documentIndex = data.documents.findIndex(e => e.id === documentID)
  const responseData = {
    doc: data.documents[documentIndex]
  }
  return [200, responseData]
})

// ------------------------------------------------
// DELETE: Deletes Invoice
// ------------------------------------------------
mock.onDelete('/api/document/delete').reply(config => {
  // Get invoice id from URL
  let documentID = config.id

  // Convert Id to number
  documentID = Number(documentID)

  const documentIndex = data.documents.findIndex(t => t.id === documentID)
  data.documents.splice(documentIndex, 1)

  return [200]
})

// ------------------------------------------------
// GET: Return Clients
// ------------------------------------------------
mock.onGet('/api/document/clients').reply(() => {
  const clients = data.documents.map(document => document.client)
  return [200, clients.slice(0, 5)]
})
