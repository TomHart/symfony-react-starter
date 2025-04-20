import React from 'react';
import UnauthenticatedApp from "./UnauthenticatedApp";
import './globals.css'
import {createRoot} from 'react-dom/client';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<UnauthenticatedApp />);
