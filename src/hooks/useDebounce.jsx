import { useEffect } from 'react'
import useTimeoutFn from './useTimeoutFn'

const useDebounce = (fn, ms, deps) => {
  const [run, clear] = useTimeoutFn(fn, ms)

  // dependency를 변수로 넘기지말라는 경고문임
  // eslint-disable-next-line
  useEffect(run, deps)

  return clear //return 한 이유는?
}

export default useDebounce
