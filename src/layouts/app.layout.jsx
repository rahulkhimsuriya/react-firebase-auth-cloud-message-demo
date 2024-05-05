import { Outlet } from 'react-router-dom'
import { useAuth } from '../libs/auth'
import { Center, Flex, Spinner } from '@chakra-ui/react'

export default function AppLayout() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <>
        <Flex
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: '100vh' }}
        >
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.100"
              color="blue.400"
              size="xl"
            />
          </Center>
        </Flex>
      </>
    )
  }

  return (
    <>
      <div className="app-layout">
        <Outlet></Outlet>
      </div>
    </>
  )
}
