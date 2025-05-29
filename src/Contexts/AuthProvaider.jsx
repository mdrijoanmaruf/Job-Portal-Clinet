import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContexs'
import { auth } from '../firebase.config';
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';

const AuthProvaider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Register new user (automatically logs them in)
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Update user profile after registration
    const updateUserProfile = (profileData) => {
        return updateProfile(auth.currentUser, profileData);
    }

    // Sign in existing user
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Monitor auth state changes
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        setLoading(false);
        console.log("User state changed: ", currentUser);
      })
      return () => {
        unsubscribe();
      }
    }, [])

    const authInfu = {
        user,
        registerUser,
        loading,
        setLoading,
        signInUser,
        updateUserProfile
    }
  
  return (
    <AuthContext.Provider value={authInfu}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvaider