import React, {createContext, useEffect, useState} from 'react'
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import {auth} from '../../firebaseConfig'

export const AuthContext = createContext();

export const Auth = ({children}) => {

    const provider = new GoogleAuthProvider();
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signUpWithEmail = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        return signInWithPopup(auth, provider)
    }

    const logout = () => {
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider
            value={{currentUser, loading, signUpWithEmail, signInWithEmail, signInWithGoogle, logout}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
