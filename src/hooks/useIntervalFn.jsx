import { useCallback, useEffect, useRef } from 'react'

//웹사이트에서 반복적인 처리를 해야할 때 사용되는 hook -useTimeout과 비슷함
const useIntervalFn = (fn, ms) => {
  const intervalId = useRef()
  const callback = useRef(fn)

  useEffect(() => {
    callback.current = fn
  }, [fn])

  const run = useCallback(() => {
    intervalId.current && clearInterval(intervalId.current)

    intervalId.current = setInterval(() => {
      callback.current()
    }, ms)
  }, [ms])

  const clear = useCallback(() => {
    intervalId.current && clearInterval(intervalId.current)
  }, [])

  useEffect(() => clear, [clear])

  return [run, clear]
}

export default useIntervalFn
