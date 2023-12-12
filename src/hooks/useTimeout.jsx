import { useEffect } from 'react'
import useTimeoutFn from './useTimeoutFn'
//컴포넌트가 로딩된 후 바로 실행되는 방법
const useTimout = (fn, ms) => {
  const [run, clear] = useTimeoutFn(fn, ms)

  useEffect(() => {
    run()
    return clear
  }, [run, clear])

  return clear
}

export default useTimout
