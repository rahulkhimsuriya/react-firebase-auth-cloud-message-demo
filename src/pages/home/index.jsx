import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Code,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react'
import { redirect, useNavigate } from 'react-router-dom'

import { getToken } from 'firebase/messaging'
import { messaging } from '../../libs/firebase'
import { useAuth } from '../../libs/auth'

// assets
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'

function Home() {
  const auth = useAuth()
  const navigate = useNavigate()

  const [count, setCount] = useState(0)
  const [pushToken, setPushToken] = useState(null)

  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission()

    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_WEB_PUSH_PUBLIC_KEY,
      })

      //We can send token to server
      console.log('Token generated : ', token)
      setPushToken(token)
    } else if (permission === 'denied') {
      //notifications are blocked
      alert('You denied for the notification')
    }
  }

  useEffect(() => {
    if (!auth.user) {
      return
    }

    requestPermission()
  }, [auth])

  const onSignout = async () => {
    try {
      await auth.signout()
      navigate('/login')
    } catch (error) {
      console.log('ERROR', error)
    }
  }

  return (
    <Container
      minHeight="100vh"
      minWidth="xl"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Flex direction="column" width="100%">
        <Center textAlign="center">
          <Box>
            <Flex>
              <Box>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                  <Image
                    src={viteLogo}
                    className="logo"
                    alt="Vite logo"
                    height="100px"
                  />
                </a>
              </Box>
              <Box>
                <a href="https://react.dev" target="_blank" rel="noreferrer">
                  <Image
                    src={reactLogo}
                    className="logo react"
                    alt="React logo"
                    height="100px"
                  />
                </a>
              </Box>
            </Flex>
          </Box>
        </Center>

        <SimpleGrid marginTop="2rem">
          <Box>
            <Card>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4" marginTop="2rem">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      <Text pt="2" fontSize="sm">
                        Counter
                      </Text>
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      <Button onClick={() => setCount((count) => count + 1)}>
                        count is {count}
                      </Button>
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Firebase User
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      <Code wordBreak="break-all">
                        {JSON.stringify(auth.user)}
                      </Code>
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Your Push token
                    </Heading>
                    <Text pt="2" fontSize="sm" textAlign="center">
                      <Code wordBreak="break-all">{pushToken}</Code>
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </Box>

          <Box marginTop="2rem">
            <Flex justifyContent="end">
              <Button colorScheme="red" variant="outline" onClick={onSignout}>
                Signout
              </Button>
            </Flex>
          </Box>
        </SimpleGrid>
      </Flex>
    </Container>
  )
}

export default Home
