import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import UserProvider from './utils/Context/UserContext'
import Navbar from './components/Navbar/navbar'
import MainPage from './pages/mainPage'
import Footer from './components/Footer/footer'
import AuthenticationPage from './pages/Authentication/authenticationPage'
import RegisterPage from './pages/Authentication/registerPage'
import Profile from './pages/Profile/profile'
import ScrollToTop from './components/ScrollToTop'
import Dashboard from './pages/Dashboard/dashboard'

function AppContent() {
  //FRONT|| profile >> edit profile to save changes || handle authorized user signip/up restrictions(separate user info file) || lazy image loading || main page links chech if signed in
  const location = useLocation();

  const hideFooterRoutes = ['/signin', '/signup', '/profile'];
  const hideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <ScrollToTop/>
      <UserProvider>
        <Navbar/>
        <Routes>
          <Route path='*' element={<MainPage/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/signin' element={<AuthenticationPage/>}/>
          <Route path='/signup' element={<RegisterPage/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </UserProvider>
      {!hideFooter && <Footer/>}
    </>  
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent/>
    </BrowserRouter>
  );
}