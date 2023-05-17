import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile,signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from '../Firebase/firebase.config';
export const AuthContext = createContext(app);
const auth = getAuth(app);
const googleAuth=new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const LogOut=()=>{
        setLoading(true);
        return signOut(auth);
    }
    const signInWithGoogle=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleAuth);
    }
    const updateUser=(userInfo)=>{
        return updateProfile(auth.currentUser,userInfo);
    }
    useEffect(()=>{ 
       const unsubscribe= onAuthStateChanged(auth,currentUser=>{
            
            setUser(currentUser);
            setLoading(false);
        });
        return ()=>unsubscribe();
    },[])
    const authinfo = {
        createUser,
        signIn,
        user,
        LogOut,
        updateUser,
        loading,
        signInWithGoogle
    }
    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;