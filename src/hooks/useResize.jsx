import { useEffect, useRef } from 'react'

//targetElement의 사이즈가 변했을 때 이벤트가 실행되는 Hook
const useResize = handler => {
  const savedHandler = useRef(handler)
  const ref = useRef(null)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const element = ref.current
    if (!element) return
    // ResizeObserver : Resize이벤트를 발생한 것을 추적할 수 잇음제공되는 API
    //entries[0].contentRect : 크기가 바뀐 것이 List로 올 수 있지만 우리는 하나만 받아온다.
    const observer = new ResizeObserver(entries => {
      savedHandler.current(entries[0].contentRect)
    })

    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [ref])

  return ref
}

export default useResize
