import React from 'react'
import App from "./App";
import {BrowserRouter as Router} from "react-router-dom";
import {IssueAlert} from "./context/IssueAlert";
import {Auth} from "./context/auth/Auth";
import {Books} from "./context/book/Books";
import {Loved} from "./context/list/Loved";
import {ToRead} from "./context/list/ToRead";
import {Review} from "./context/review/Review";

export const Container = ({children}) => {
    return (
        <Router>
            <IssueAlert>
                <Auth>
                    <Books>
                        <Loved>
                            <ToRead>
                                <Review>
                                    <App>
                                        {children}
                                    </App>
                                </Review>
                            </ToRead>
                        </Loved>
                    </Books>
                </Auth>
            </IssueAlert>
        </Router>
    )
}
