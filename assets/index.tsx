import React from 'react';
import App from "./App";
import './globals.css'
import {createRoot} from 'react-dom/client';

// @ts-ignore
// React.icons = icons;
//
// ReactDOM.render(<App/>, document.getElementById('app'));

const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);
