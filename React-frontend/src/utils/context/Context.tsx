import { useContext, createContext, useState, useEffect } from 'react'
import { getToken } from '../utils'

interface ContextValues {
  isAuth: boolean
  ola: string
  setIsAuth: (isAuth: boolean) => void
  setOla: (ola: string) => void
}

const defaultValue: ContextValues = {
  isAuth: false,
  ola: '',
  setIsAuth: () => {},
  setOla: () => {},
}

const Context = createContext(defaultValue)

interface ProviderTasks {
  children: React.ReactNode
}

export default function ContextTask({ children }: ProviderTasks) {
  const [isAuth, setIsAuth] = useState(false)
  const [ola, setOla] = useState('')
  useEffect(()=>{
    const verifyToken = async () => {
      try {
        getToken()
        .then(data => {
          if(data.status === 1) {
            setIsAuth(true)
          }
          if(data.status === 0) {
            setIsAuth(false)
          }
        }
        )
      } catch (error) {
        setIsAuth(false)
      }
    }
    verifyToken()

    const interval = setInterval(verifyToken, 600000)

    return () => {
      clearInterval(interval);
    }
  }, [])

  const contextValues = {
    isAuth,
    ola,
    setIsAuth,
    setOla,
  }
  

  return <Context.Provider value={contextValues}>{children}</Context.Provider>
}

export const useCustomContext = () => useContext(Context)
