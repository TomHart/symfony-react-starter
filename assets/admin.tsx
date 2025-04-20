import React from 'react';
import LandingApp from "./LandingApp";
import './globals.css'
import {createRoot} from 'react-dom/client';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<LandingApp />);
