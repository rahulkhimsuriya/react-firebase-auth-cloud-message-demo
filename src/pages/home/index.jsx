import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Card,
  CardBody,
  CardHeader,
  Container,
  Text,
  Flex,
  Code,
  Stack,
  StackDivider,
  Heading,
  Image,
} from '@chakra-ui/react'

import { getToken } from 'firebase/messaging'
import { messaging } from '../../libs/firebase'

import { useAuth } from '../../libs/auth'

// assets
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'

function Home() {
  const [count, setCount] = useState(0)
  const [pushToken, setPushToken] = useState(null)

  const auth = useAuth()

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
      <Flex direction="column">
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
                    <Flex justifyContent="space-between">
                      <Box>
                        <Button onClick={() => setCount((count) => count + 1)}>
                          count is {count}
                        </Button>
                      </Box>
                    </Flex>
                  </Text>
                </Box>

                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Firebase User
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    <Code>{JSON.stringify(auth.user)}</Code>
                  </Text>
                </Box>

                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Your Push token
                  </Heading>
                  <Text pt="2" fontSize="sm" textAlign="center">
                    <Code>
                      <Text wordBreak="break-all">{pushToken}</Text>
                    </Code>
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Box>

        <Box marginTop="2rem">
          <Flex justifyContent="end">
            <Button colorScheme="red" variant="outline">
              Signout
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Container>
  )

  // return (
  //   <>
  //     <div>
  //       <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank" rel="noreferrer">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>

  //       <div style={{ marginLeft: '1rem' }}>
  //         {auth.user ? (
  //           <button onClick={() => auth.signout()}>SignOut</button>
  //         ) : (
  //           <button onClick={() => auth.signIn()}>SignIn</button>
  //         )}
  //       </div>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>

  //     <div className="card">
  //       <code>{pushToken}</code>
  //     </div>
  //   </>
  // )
}

export default Home
