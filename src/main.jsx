import React from 'react';
import { createRoot } from 'react-dom/client';
import SinglePageDashboard from './App.jsx';
import './index.css';
createRoot(document.getElementById('root')).render(<React.StrictMode><SinglePageDashboard /></React.StrictMode>);
