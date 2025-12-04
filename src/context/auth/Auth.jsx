import React, {createContext, useEffect, useState} from 'react'
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from "firebase/auth";
import {auth} from '../../config/firebaseConfig'

export const AuthContext = createContext();

export const Auth = ({children}) => {

    const provider = new GoogleAuthProvider();

    const [currentUser, setCurrentUser] = useState(null);
    const [idToken, setIdToken] = useState(null);
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

    const passwordResetEmail = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setCurrentUser(currentUser);
            if (currentUser) {
                const token = await currentUser.getIdToken();
                setIdToken(token);
            } else {
                setIdToken(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);


    return (
        <AuthContext.Provider
            value={{
                currentUser,
                loading,
                signUpWithEmail,
                signInWithEmail,
                signInWithGoogle,
                passwordResetEmail,
                idToken,
                logout
            }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
