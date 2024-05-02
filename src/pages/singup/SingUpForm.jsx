import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../../libs/auth'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const SingUpFormSchema = yup.object({
  name: yup.string().required().min(3).trim(),
  email: yup.string().required().email().trim(),
  password: yup.string().required().min(6),
})

export default function SignUpForm() {
  const navigate = useNavigate()
  const auth = useAuth()
  const toast = useToast()
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(SingUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [loading, setLoading] = useState(false)

  const onSignIn = async ({ name, email, password }) => {
    setLoading(true)

    try {
      await auth.signUpWithEmailAndPassword({
        name,
        email,
        password,
      })

      navigate('/')

      toast({
        title: 'Welcome back.',
        description: 'You have logged in successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      const { code: errorCode } = { ...error }
      if (errorCode == 'auth/invalid-credential') {
        toast({
          title: 'Error',
          description: 'Credential did not matched.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <Box width={'100%'}>
      <Box>
        <Text fontSize={32} fontWeight="light">
          Sign up to create an new account
        </Text>

        <Text style={{ display: 'flex', justifyContent: 'center' }}>
          <Text as="span">Or</Text>
          <Text
            as="span"
            textColor="blue.400"
            marginLeft={2}
            _hover={{ textDecoration: 'underline' }}
            textUnderlineOffset={2}
          >
            <Link to={'/login'}>Already have account?</Link>
          </Text>
        </Text>
      </Box>

      <Box marginTop={8} textAlign="left">
        <form method="POST" onSubmit={handleSubmit(onSignIn)}>
          <FormControl>
            <FormLabel
              htmlFor="name"
              fontSize="sm"
              fontWeight="medium"
              marginBottom={1}
            >
              Name
            </FormLabel>
            <Input
              id="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Enter your name"
              errorBorderColor="red.400"
              isInvalid={!!errors.name?.message}
              {...register('name')}
            />
            {errors.name && (
              <Text textColor="red.400">{errors.name.message}</Text>
            )}
          </FormControl>

          <FormControl marginTop={6}>
            <FormLabel
              htmlFor="email"
              fontSize="sm"
              fontWeight="medium"
              marginBottom={1}
            >
              Email
            </FormLabel>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Enter your email"
              errorBorderColor="red.400"
              isInvalid={!!errors.email?.message}
              {...register('email')}
            />
            {errors.email && (
              <Text textColor="red.400">{errors.email.message}</Text>
            )}
          </FormControl>

          <FormControl marginTop={6}>
            <FormLabel
              htmlFor="password"
              fontSize="sm"
              fontWeight="medium"
              marginBottom={1}
            >
              Password
            </FormLabel>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Enter your password"
              errorBorderColor="red.400"
              isInvalid={!!errors.password?.message}
              {...register('password')}
            />
            {errors.password && (
              <Text textColor="red.400">{errors.password.message}</Text>
            )}
          </FormControl>
          <Button
            type="submit"
            py={2}
            px={4}
            marginTop={6}
            fontSize="sm"
            fontWeight="medium"
            color="white"
            width={'100%'}
            bg="blue.500"
            _hover={{ bg: 'blue.600' }}
            isLoading={loading}
            loadingText="Singing in...."
          >
            Sign in
          </Button>
        </form>
      </Box>
    </Box>
  )
}
