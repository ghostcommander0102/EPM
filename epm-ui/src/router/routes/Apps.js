import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const AppRoutes = [
  {
    path: '/apps/email',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email'))
  },
  {
    path: '/apps/email/:folder',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/apps/email'
    }
  },
  {
    path: '/apps/email/label/:label',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/apps/email'
    }
  },
  {
    path: '/apps/email/:filter',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/apps/email'
    }
  },
  {
    path: '/apps/todo',
    exact: true,
    appLayout: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/apps/todo'))
  },
  {
    path: '/apps/todo/:filter',
    appLayout: true,
    exact: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/apps/todo')),
    meta: {
      navLink: '/apps/todo'
    }
  },
  {
    path: '/apps/todo/tag/:tag',
    appLayout: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/apps/todo')),
    meta: {
      navLink: '/apps/todo'
    }
  },
  {
    path: '/document/list',
    component: lazy(() => import('../../views/apps/document/list'))
  },
  {
    path: '/document/preview/:id',
    component: lazy(() => import('../../views/apps/document/preview')),
    meta: {
      navLink: '/document/preview'
    }
  },
  {
    path: '/document/preview',
    exact: true,
    component: () => <Redirect to='/apps/invoice/preview/4987' />
  },
  {
    path: '/document/print',
    layout: 'BlankLayout',
    component: lazy(() => import('../../views/apps/document/print'))
  },
  {
    path: '/apps/user/list',
    component: lazy(() => import('../../views/apps/user/list'))
  },
  {
    path: '/apps/user/edit',
    exact: true,
    component: () => <Redirect to='/apps/user/edit/1' />
  },
  {
    path: '/apps/user/edit/:id',
    component: lazy(() => import('../../views/apps/user/edit')),
    meta: {
      navLink: '/apps/user/edit'
    }
  },
  {
    path: '/apps/user/view',
    exact: true,
    component: () => <Redirect to='/apps/user/view/1' />
  },
  {
    path: '/apps/user/view/:id',
    component: lazy(() => import('../../views/apps/user/view')),
    meta: {
      navLink: '/apps/user/view'
    }
  },
  {
    path: '/patient/new',
    component: lazy(() => import('../../views/apps/patient/new')),
    meta: {
      navLink: '/patient/new'
    }
  },
  {
    path: '/patient/search',
    component: lazy(() => import('../../views/apps/patient/search')),
    meta: {
      navLink: '/patient/search'
    }
  },
  {
    path: '/patient/new',
    component: lazy(() => import('../../views/apps/patient/new')),
    appLayout: true,
    exact: true,
    // layout: 'BlankLayout',
    meta: {
      navLink: '/patient/new'
    }
  },
  {
    path: '/patient/consent-agreement',
    component: lazy(() => import('../../views/apps/patient/new')),
    layout: 'BlankLayout',
    meta: {
      action: 'read',
      resource: 'ACL',
      navLink: '/patient/consent-agreement'
    }
  },
  {
    path: '/patient/visit',
    component: lazy(() => import('../../views/apps/patient/visit')),
    meta: {
      navLink: '/patient/visit'
    }
  },
  {
    path: '/patient/review',
    component: lazy(() => import('../../views/apps/patient/review')),
    meta: {
      navLink: '/patient/review'
    }
  },
  {
    path: '/patients/review/:id',
    component: lazy(() =>  import('../../views/apps/patient/new') ),
    meta: {
      navLink: '/patients/review/:id',
    }
  }
]

export default AppRoutes
