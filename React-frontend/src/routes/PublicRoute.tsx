import { Outlet, Navigate, useLocation, Location } from 'react-router-dom'
import { useCustomContext } from '../utils/context/Context'

export default function PublicRoute() {
  const { isAuth }: { isAuth: boolean } = useCustomContext()
  const location: Location = useLocation()
  const previousURL: string | undefined = location.state?.from.pathname

  return !isAuth ? <Outlet /> : <Navigate to={ previousURL || 'home' } />
}
