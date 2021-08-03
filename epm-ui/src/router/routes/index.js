// ** Routes Imports
import AppRoutes from './Apps'
import PagesRoutes from './Pages'
import DashboardRoutes from './Dashboards'
import ExtensionsRoutes from './Extensions'


// ** Document title
const TemplateTitle = '%s - {themeConfig.app.appName}'

// ** Default Route
const DefaultRoute = '/dashboard'

// ** Merge Routes
const Routes = [
  ...DashboardRoutes,
  ...AppRoutes,
  ...PagesRoutes,
  ...ExtensionsRoutes
]

export { DefaultRoute, TemplateTitle, Routes }
