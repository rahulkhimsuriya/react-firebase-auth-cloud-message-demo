import { useToast } from '@chakra-ui/react'
import { useRouteError } from 'react-router-dom'

export default function NotFound() {
  const toast = useToast()
  const error = useRouteError()

  /**
   * App in DEVELOPMENT then display error in toast message
   * for debugging purpose
   */
  if (import.meta.env.DEV && import.meta.env.MODE === 'development') {
    console.log('[ERRORS ROUTES]', error)

    toast({
      title: 'Errors',
      description: JSON.stringify(error),
      status: 'danger',
      duration: 5000,
      isClosable: true,
    })
  }

  return <div>NotFound</div>
}
