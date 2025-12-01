import React from 'react'
import App from "./App";
import {Auth} from "./context/auth/Auth";
import {Books} from "./context/book/Books";
import {Review} from "./context/review/Review";
import {BrowserRouter as Router} from "react-router-dom";

export const Container = ({children}) => {
    return (
        <Router>
            <Auth>
                <Books>
                    <Review>
                        <App>
                            {children}
                        </App>
                    </Review>
                </Books>
            </Auth>
        </Router>
    )
}
