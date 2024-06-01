/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

// Layouts
const AppLayout = lazy(() => import('../layouts/app.layout'))
const AuthLayout = lazy(() => import('../layouts/auth.layout'))
const GuestLayout = lazy(() => import('../layouts/guest.layout'))

// Pages
const Home = lazy(() => import('../pages/home'))
const Login = lazy(() => import('../pages/login'))
const SignUp = lazy(() => import('../pages/singup'))
const NotFound = lazy(() => import('../pages/errors/not-found'))

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" Component={AppLayout} errorElement={NotFound}>
      <Route path="/" Component={AuthLayout}>
        <Route index path="home" Component={Home} />
      </Route>
      <Route path="/" Component={GuestLayout}>
        <Route index path="login" Component={Login} />
        <Route path="signup" Component={SignUp} />
      </Route>
    </Route>,
  ),
)
