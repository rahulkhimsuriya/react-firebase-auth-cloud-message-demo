import { RouterProvider } from 'react-router-dom'
import { Center, Spinner } from '@chakra-ui/react'
import { router } from './routes/router.jsx'

function App() {
  return (
    <RouterProvider
      fallbackElement={
        <Center>
          <Spinner />
        </Center>
      }
      router={router}
    />
  )
}

export default App
