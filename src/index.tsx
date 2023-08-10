import React from 'react';
import './index.scss';
import App from './App';
import ReactDOM from 'react-dom';

const rootElement = document.getElementById('root')!;
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    rootElement
);
