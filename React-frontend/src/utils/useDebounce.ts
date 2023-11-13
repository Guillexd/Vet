import { useState, useEffect } from 'react'

export default function useDebounce(value: string, delay: number) {
  const [debounceValue, setDebounceValue] = useState<string>('')
  
  useEffect(()=>{
    const handler = setTimeout(()=>{
      setDebounceValue(value)
    }, delay)
    return ()=>{
      clearTimeout(handler)
    } 
  }, [value])

  return { debounceValue }
}