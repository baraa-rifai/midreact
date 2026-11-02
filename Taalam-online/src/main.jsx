import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import { AuthProvider } from './Context/AuthProvider.jsx'
import { CourseProvider } from './Context/CourseProvider.jsx'
import { UserProvider } from './Context/UserProvider.jsx'
import { MessageProvider } from './Context/MessageProvider.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CourseProvider>
          <UserProvider>
            <MessageProvider>
              <Toaster position="top-center" />
              <App />
            </MessageProvider>
          </UserProvider>
        </CourseProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)