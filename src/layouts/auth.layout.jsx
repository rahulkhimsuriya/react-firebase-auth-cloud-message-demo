import { Outlet } from 'react-router-dom'
import { useAuth, HOME_ROUTE } from '../hooks/auth'

export default function MainLayout() {
  useAuth({
    middleware: 'auth',
    redirectIfAuthenticated: HOME_ROUTE,
  })

  return (
    <>
      <div className="auth-layout">
        <Outlet></Outlet>
      </div>
    </>
  )
}
