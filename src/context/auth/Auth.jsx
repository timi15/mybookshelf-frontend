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

    const isTest = process.env.NODE_ENV === 'test' || window.Cypress
    const cyStub = () => Promise.resolve()

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

    if (isTest) {
        return (
            <AuthContext.Provider
                value={{
                    currentUser: { uid: 'test-user', email: 'test@test.com' },
                    idToken: 'test-token',
                    loading: false,
                    signUpWithEmail: cyStub,
                    signInWithEmail: cyStub,
                    signInWithGoogle: cyStub,
                    passwordResetEmail: cyStub,
                    logout: cyStub
                }}
            >
                {children}
            </AuthContext.Provider>
        )
    }

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
