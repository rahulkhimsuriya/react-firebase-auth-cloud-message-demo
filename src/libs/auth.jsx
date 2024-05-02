/**
 * CODE STOLEN FROM @leerob
 * https://github.com/leerob/fastfeedback/blob/master/lib/auth.js
 */

import { useContext, createContext, useEffect, useState } from 'react'

import {
  signInAnonymously,
  signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
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
    return signInAnonymously(auth).then((response) => handleUser(response.user))
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

  return {
    user,
    loading,
    signIn,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
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
