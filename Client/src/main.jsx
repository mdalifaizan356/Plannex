// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserContextProvider from '../src/ContextProvider/UserContextProvider';
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css"

createRoot(document.getElementById('root')).render(
  // <StrictMode>t
  <UserContextProvider>
    <App />
    <ToastContainer position="top-center"
    autoClose={2000}
     />
  </UserContextProvider>
  // </StrictMode>,
)
 