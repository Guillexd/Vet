import { useState, useEffect } from 'react'
import { fetchData } from './utils'

export default function useFetchData<T>(url: string, dependency: any = [null]) {

  const [data, setData] = useState<T>([] as T)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => { 
    setLoading(true)
    fetchData<T>(url)
    .then((_data: T) => {
      setLoading(false)
      setData(_data)
    })
  }, dependency)

  return { data, loading }
}