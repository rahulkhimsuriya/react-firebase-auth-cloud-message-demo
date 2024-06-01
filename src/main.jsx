import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'

import { Center, ChakraProvider, Spinner } from '@chakra-ui/react'

import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider toastOptions={{ defaultOptions: { position: 'bottom' } }}>
      <Suspense
        fallback={
          <Center>
            <Spinner />
          </Center>
        }
      >
        <App />
      </Suspense>
    </ChakraProvider>
  </React.StrictMode>,
)
