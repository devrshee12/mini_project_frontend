import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './context/user_context';
import { DashboradProvider } from './context/dashboard_context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <DashboradProvider>
      <App />
    </DashboradProvider>
  </UserProvider>
  
);


