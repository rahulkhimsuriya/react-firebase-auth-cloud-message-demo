import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  // please create this route auth guarded
  {
    path: '/',
    children: [
      {
        path: '/home',
        Component: lazy(() => import('../pages/home')),
      },
    ],
  },
  // please create this public route
  {
    path: '/login',
    Component: lazy(() => import('../pages/login')),
  },
])

// export const router = browserRouter.map((route) => {})
