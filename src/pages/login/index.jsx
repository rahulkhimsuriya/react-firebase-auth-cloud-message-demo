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
} from '@chakra-ui/react'
import { useAuth } from '../../libs/auth'

export default function Login() {
  const auth = useAuth()

  const [loading, setLoading] = useState(false)

  const onSignIn = async () => {
    setLoading(true)

    try {
      await auth.signIn()
    } catch (error) {
      console.log('ERROR', error)
    } finally {
      setLoading(false)
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
        textAlign: 'center',
      }}
    >
      <Box width="100%" style={{ marginTop: '-5rem' }}>
        <Card>
          <CardHeader>
            <Text>Sign In</Text>
          </CardHeader>

          <CardBody>
            <Box>
              <ButtonGroup>
                <Button
                  isLoading={loading}
                  loadingText="Loading..."
                  onClick={onSignIn}
                >
                  Signin
                </Button>
              </ButtonGroup>
            </Box>
          </CardBody>
        </Card>
      </Box>
    </Container>
  )
}
