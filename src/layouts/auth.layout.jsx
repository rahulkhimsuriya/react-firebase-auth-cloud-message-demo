import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <>
      <div className="auth-layout">
        <Outlet></Outlet>
      </div>
    </>
  )
}
