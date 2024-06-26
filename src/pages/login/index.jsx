import { Box, Container } from '@chakra-ui/react'

import SignInForm from './SignInForm'

export default function Login() {
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
        <SignInForm />
      </Box>
    </Container>
  )
}
