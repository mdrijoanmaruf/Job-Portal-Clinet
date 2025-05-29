import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContexs'
import { auth } from '../firebase.config';
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup
} from 'firebase/auth';

const AuthProvaider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    
    // Create providers
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

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
    
    // Google sign in
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    
    // GitHub sign in
    const signInWithGithub = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    }

    // Sign out user
    const logoutUser = () => {
        setLoading(true);
        return signOut(auth);
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
        updateUserProfile,
        logoutUser,
        signInWithGoogle,
        signInWithGithub
    }
  
  return (
    <AuthContext.Provider value={authInfu}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvaider