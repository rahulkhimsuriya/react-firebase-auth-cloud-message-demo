import { useEffect, useState } from 'react'

import {
  signInAnonymously,
  signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { app } from '../libs/firebase'

export const HOME_ROUTE = '/home'
export const LOGIN_ROUTE = '/login'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  {
    const navigate = useNavigate()
    const auth = getAuth(app)

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const handleUser = (rawUser) => {
      if (rawUser) {
        const user = formatUser(rawUser)

        setLoading(false)
        setUser(user)
        return user
      } else {
        setLoading(false)
        setUser(false)
        return false
      }
    }

    const signIn = () => {
      return signInAnonymously(auth).then((response) =>
        handleUser(response.user),
      )
    }

    const signInWithEmailAndPassword = ({ email, password }) => {
      return signInWithEmailAndPasswordFirebase(auth, email, password).then(
        (response) => handleUser(response.user),
      )
    }

    const signUpWithEmailAndPassword = ({ email, password }) => {
      return createUserWithEmailAndPassword(auth, email, password).then(
        (response) => handleUser(response.user),
      )
    }

    const signout = () => {
      return auth.signOut().then(() => handleUser(false))
    }

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, handleUser)

      return () => unsubscribe()
    }, [auth])

    useEffect(() => {
      if (loading) {
        return
      }

      if (middleware === 'auth' && !user) {
        navigate(LOGIN_ROUTE)
      }

      if (middleware === 'auth' && user) {
        navigate(redirectIfAuthenticated)
      }

      if (middleware === 'guest' && redirectIfAuthenticated && user) {
        navigate(redirectIfAuthenticated)
      }
    }, [user, loading])

    return {
      user,
      loading,
      signIn,
      signInWithEmailAndPassword,
      signUpWithEmailAndPassword,
      signout,
    }
  }
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0],
    photoUrl: user.photoURL,
  }
}
