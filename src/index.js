import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './firebaseConfig'
import reportWebVitals from './reportWebVitals';
import {Container} from "./Container";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Container/>
    </React.StrictMode>
);

reportWebVitals();
