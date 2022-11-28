import React, { createContext } from 'react';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import app from '../Firebase/firebase.config';
export const AuthContext=createContext(app);
const auth=getAuth(app);
const AuthProvider = ({children}) => {
    const createUser=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const authinfo={
        createUser,
    }
    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;