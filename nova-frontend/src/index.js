import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Context from './contexts/AuthContext';
import TutorContext from './contexts/TutorAuthContext';
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <TutorContext>
        <Context>
            <App />
        </Context>
    </TutorContext>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
