import { Box, Container } from '@chakra-ui/react'

import SingUpForm from './SingUpForm'

export default function SignUp() {
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
        <SingUpForm />
      </Box>
    </Container>
  )
}
