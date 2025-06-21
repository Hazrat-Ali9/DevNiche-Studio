import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Modal from 'react-modal'
import { AuthProvider } from './store/auth.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
Modal.setAppElement('#root');
createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <StrictMode>
    <App />
    <ToastContainer 
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    transition: Slide
    bodyClassName="toastBody"
    />
  </StrictMode>
  </AuthProvider>,
)
