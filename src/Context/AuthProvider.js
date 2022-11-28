import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../Firebase/firebase.config';
export const AuthContext = createContext(app);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user,setUser]=useState(null);
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    useEffect(()=>{
       const unsubscribe= onAuthStateChanged(auth,currentUser=>{
            console.log(currentUser);
            setUser(currentUser);
        });
        return ()=>unsubscribe();
    },[])
    const authinfo = {
        createUser,
        signIn,
        user
    }
    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;