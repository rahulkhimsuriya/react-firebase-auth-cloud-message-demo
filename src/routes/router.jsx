import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

// Layouts
import AppLayout from '../layouts/app.layout'
import AuthLayout from '../layouts/auth.layout'
import GuestLayout from '../layouts/guest.layout'

// Pages
import Home from '../pages/home'
import Login from '../pages/login'
import SignUp from '../pages/singup'
import NotFound from '../pages/errors/not-found'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />} errorElement={<NotFound />}>
      <Route path="/" element={<AuthLayout />}>
        {/* <Route index element={<Home />} /> */}
        <Route path="home" element={<Home />} />
      </Route>
      <Route path="/" element={<GuestLayout />}>
        <Route index path="login" element={<Login />} />,
        <Route path="signup" element={<SignUp />} />,
      </Route>
      ,
    </Route>,
  ),
)
