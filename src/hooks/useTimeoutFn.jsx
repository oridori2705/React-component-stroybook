import { useCallback, useEffect, useRef } from 'react'
//함수호출을 통한 방법
const useTimeoutFn = (fn, ms) => {
  const timeoutId = useRef()
  const callback = useRef(fn)

  useEffect(() => {
    callback.current = fn
  }, [fn])
  // Timeout이 끝나면 fn함수를 실행하는 함수
  const run = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current)

    timeoutId.current = setTimeout(() => {
      callback.current()
    }, ms)
  }, [ms])

  //Timeout을 해제하는 함수
  const clear = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current)
  }, [])
  
  //해당 훅이 사라질 때 clear를 해줘야한다
  //해당 컴포넌트가 사라져도 timeout이 남아서 실행이되는 버그가 생길 수있다.
  useEffect(() => clear, [clear])

  return [run, clear]
}

export default useTimeoutFn
