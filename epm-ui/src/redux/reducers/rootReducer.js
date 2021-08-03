// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import chat from '@src/views/apps/chat/store/reducer'
import todo from '@src/views/apps/todo/store/reducer'
import users from '@src/views/apps/user/store/reducer'
import email from '@src/views/apps/email/store/reducer'
import document from '@src/views/apps/document/store/reducer'
import calendar from '@src/views/apps/calendar/store/reducer'
import dataTables from '@src/views/tables/data-tables/store/reducer'
import patient from '@src/views/apps/patient/store/reducer'

const rootReducer = combineReducers({
  auth,
  todo,
  chat,
  email,
  users,
  navbar,
  layout,
  patient,
  document,
  calendar,
  // ecommerce,
  dataTables
})

export default rootReducer
