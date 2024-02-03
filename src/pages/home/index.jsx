import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Center,
  Card,
  CardBody,
  Container,
  Text,
  Flex,
  Code,
  Stack,
  StackDivider,
  Heading,
  Image,
  SimpleGrid,
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

        <SimpleGrid marginTop="2rem" columns={1} spacing={10}>
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

          <Box>
            <Flex justifyContent="end">
              <Button colorScheme="red" variant="outline">
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
