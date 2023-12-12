import { useEffect, useRef } from 'react'

const events = ['mousedown', 'touchstart']

//특정영역 외의 영역을 클릭했을 때 이벤트를 발생시키는 Hook
const useClickAway = handler => {
  const ref = useRef(null)

  //핸들러 함수가 바뀌면 이벤트가 해제됐다가 다시 등록되는데 이 불필요한 과정을 생략하기 위한 ref
  //핸들러함수를 ref에 담아서 핸들러함수가 바뀌면 useEffect를 통해 핸들러 함수만 바꿔준다.
  const savedHandler = useRef(handler)
  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleEvent = e => {
      //e.target이 정해진 영역에 포함이안되는 영역이라면
      !element.contains(e.target) && savedHandler.current(e)
    }

    for (const eventName of events) {
      document.addEventListener(eventName, handleEvent)
    }
    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handleEvent)
      }
    }
  }, [ref])
  return ref
}

export default useClickAway
