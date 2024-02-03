import { useAuth } from './libs/auth'
import Home from './pages/home'
import Login from './pages/login'

function App() {
  const auth = useAuth()

  if (auth.user) {
    return (
      <>
        <Home />
      </>
    )
  }

  return (
    <>
      <Login />
    </>
  )
}

export default App
