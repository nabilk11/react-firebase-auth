import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// create AuthContext, with createContext to be used within the Provider

const AuthContext = createContext()

// function to useAuth hook and use authcontext
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    // state hook for the current user
const [currentUser, setCurrentUser] = useState()

// signup function
const signup = (email, password) => {
return createUserWithEmailAndPassword(auth, email, password)
}

useEffect(() => {
// setting current user within useEffect so it runs on render
const unsubscribe = auth.onAuthStateChanged(user => {
    setCurrentUser(user)
})
return unsubscribe
}, [])


//value sent to using the AuthContext
    const value = {
        currentUser,
        signup,
        
    }
  return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
        
  )
}
