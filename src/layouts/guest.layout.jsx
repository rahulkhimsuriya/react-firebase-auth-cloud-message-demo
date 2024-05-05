import { Outlet } from 'react-router-dom'
import { useAuth, HOME_ROUTE } from '../libs/auth'

export default function GuestLayout() {
  useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: HOME_ROUTE,
  })

  return (
    <>
      <div className="guest-layout">
        <Outlet></Outlet>
      </div>
    </>
  )
}
