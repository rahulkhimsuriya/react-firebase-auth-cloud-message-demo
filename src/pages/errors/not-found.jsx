import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Link, useRouteError } from 'react-router-dom'

import viteLogo from '/vite.svg'
import { HOME_ROUTE } from '../../hooks/auth'

export default function NotFound() {
  const error = useRouteError()

  /**
   * App in DEVELOPMENT then display error in toast message
   * for debugging purpose
   */
  if (import.meta.env.DEV && import.meta.env.MODE === 'development') {
    console.log('[ERRORS ROUTES]', error)
  }

  return (
    <Box>
      <Flex
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Center>
          <Box textAlign="center">
            <Box display="flex" justifyContent="center">
              <Image
                src={viteLogo}
                className="logo"
                alt="Vite logo"
                height="100px"
              />
            </Box>

            <Box marginTop={4}>
              <Text>Page not found</Text>

              <Box as="div" marginTop={4}>
                <Link to={HOME_ROUTE}>
                  <Button type="submit">Back to home</Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Center>
      </Flex>
    </Box>
  )
}
