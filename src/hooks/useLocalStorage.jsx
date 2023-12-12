import { useState } from 'react'

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      //로컬 스토리지에 값이 있으면 storedValue의 초기값을 설정
      return item ? JSON.parse(item) : initialValue
    } catch (e) {
      console.error(e)
      return initialValue
    }
  })

  const setValue = value => {
    try {
      //만약 받아오는 value가 함수를 받아온다면
      const valueToStore =
        typeof value === 'function' ? value(storedValue) : value

      setStoredValue(valueToStore)
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (e) {
      console.error(e)
    }
  }
  return [storedValue, setValue]
}

export default useLocalStorage
