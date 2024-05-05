import React from 'react'
import ReactDOM from 'react-dom/client'

import { ChakraProvider } from '@chakra-ui/react'

import App from './App.jsx'

// import { AuthProvider } from './libs/auth'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider toastOptions={{ defaultOptions: { position: 'bottom' } }}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
