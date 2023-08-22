import { useEffect, useState } from 'react'
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import ContextTask from './utils/context/Context'
import FormSendEmailToChangePassword from './components/pages/FormSendEmailToChangePassword'
import ErrorNotFound from './components/presentationals/ErrorNotFound'
import ChangePassword from './components/pages/ChangePassword'
import styled, { ThemeProvider } from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'react-toastify/dist/ReactToastify.css'
import Pet from './components/pages/Pet'
import Testimonial from './components/pages/Testimonial'
import Messenger from './components/pages/Messenger'
import UserListContainer from './components/pages/User/UserListContainer'

const lightTheme = {
  colors: {
    bgPrimary: '#F2F9FF',
    textColor: 'black',
    bgColorCard: '#EDEDED',
    textColorCard: '#444444',
    hoverColorCard: '#00362e',
    hoverTextColor: '#F2F2F2',
  }
}

const darkTheme = {
  colors: {
    bgPrimary: '#001a17',
    textColor: 'white',
    bgColorCard: '#00362e',
    textColorCard: '#F2F2F2',
    hoverColorCard: '#EDEDED',
    hoverTextColor: '#444444',
  }
}

const Container = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.bgPrimary};
  position: relative;
`

export default function App() {

  const [darkMode, setDarkMode] = useState<boolean>(!!(localStorage.getItem('mode') == 'dark'))

  useEffect(()=> {
    !!localStorage.getItem('mode') || localStorage.setItem('mode', 'light')
  }, [])
  
  return (
    <Router>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Container>
          <ContextTask>
            <Routes>
              <Route
                path='/'
                element={<PrivateRoute darkMode={darkMode} setDarkMode={setDarkMode} />}
                >
                <Route
                  index
                  element={<Navigate to='/home' />}
                  />
                <Route
                  path='/home'
                  element={<Home />}
                  />
                <Route 
                  path='/user'
                  element={<UserListContainer />}
                  />
                <Route 
                  path='/pet'
                  element={<Pet />}
                  />
                <Route 
                  path='/testimonial'
                  element={<Testimonial />}
                  />
                <Route 
                  path='/messenger'
                  element={<Messenger />}
                  />
              </Route>
              <Route
                path='/'
                element={<PublicRoute />}
                >
                <Route
                  path='/login'
                  element={<Login />}
                  />
                <Route
                  path='/send-email'
                  element={<FormSendEmailToChangePassword />}
                  />
                <Route
                  path='/change-password'
                  element={<ChangePassword />}
                  />
              </Route>
              <Route
                path='*'
                element={<ErrorNotFound />}
                />
            </Routes>
          </ContextTask>
        </Container>
      </ThemeProvider>
    </Router>
  )
}

