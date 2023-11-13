import { Dispatch, SetStateAction } from 'react'
import { Outlet, Navigate, useLocation, Location } from 'react-router-dom'
import { useCustomContext } from '../utils/context/Context'
import NavBar from '../components/presentationals/NavBar'

export default function PrivateRoute({ darkMode, setDarkMode }: { darkMode: boolean, setDarkMode: Dispatch<SetStateAction<boolean>> }) {
  const { isAuth }: { isAuth: boolean } = useCustomContext()
  const location: Location = useLocation()

  
  return isAuth ? <>  <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />  <Outlet /> </> : <Navigate to={'/login' } state={{from: location}} />
}
