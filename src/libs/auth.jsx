import { useContext, createContext, useEffect, useState } from 'react'

import {
  signInAnonymously,
  getAuth,
  signOut,
  onAuthStateChanged,
  deleteUser,
} from 'firebase/auth'
import { app } from './firebase'

const authContext = createContext()

export const useAuth = () => {
  return useContext(authContext)
}

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

function useProvideAuth() {
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
    signInAnonymously(auth).then((response) => handleUser(response.user))
  }

  const signout = () => {
    return deleteUser(auth.currentUser).then(() => handleUser(false))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUser)

    return () => unsubscribe()
  }, [auth])

  return {
    user,
    loading,
    // signinWithGitHub,
    signIn,
    signout,
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
