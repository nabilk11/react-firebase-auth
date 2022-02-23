import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from "firebase/auth";

// create AuthContext, with createContext to be used within the Provider

const AuthContext = createContext()

// function to useAuth hook and use authcontext
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    // state hook for the current user
const [currentUser, setCurrentUser] = useState()
// loading state for firebase auth token
const [loading, setLoading] = useState(true)


/*********LOGIN, LOGOUT, RESET PASSWORD & SIGNUP FUNCTIONS w/FIREBASE *********/
// APP CAN BE USED WITHOUT FIREBASE IF THESE FUNCTIONS ARE CHANGED
// signup function - from firebase
const signup = (email, password) => {
return createUserWithEmailAndPassword(auth, email, password)
}

// login function - from firebase
const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}
// logout function - from firebase
const logout = () => {
    return signOut(auth)
}

// FORGOT PASSWORD RESET
const resetPassword = (email) => {
return sendPasswordResetEmail(auth, email)
}

/********* UPDATE PROFILE INFO *********/
function updateEmail (email) {
return currentUser.updateEmail(email)
}

function updatePassword (password) {
    return currentUser.updatePassword(password)


}




useEffect(() => {
// setting current user within useEffect so it runs on render
const unsubscribe = auth.onAuthStateChanged(user => {
    setCurrentUser(user)
    // need to set loading state to refresh firebase token
    setLoading(false)
    
})
return unsubscribe
}, [])


//value sent to using the AuthContext
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
    }
  return (
        <AuthContext.Provider value={value}>
            
            {!loading && children} 
        </AuthContext.Provider>
        
  )
}
// {!loading && children} - this check ensures that we do not load any of our other application until the loading state is set
