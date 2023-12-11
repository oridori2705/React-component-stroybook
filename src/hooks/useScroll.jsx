import { useEffect, useRef } from 'react'
import useRafState from './useRafState'

const useScroll = () => {
  const [state, setState] = useRafState({ x: 0, y: 0 })
  const ref = useRef(null)
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      setState({
        x: ref.current.scrollLeft,
        y: ref.current.scrollTop
      })
    }

    //passive : true => 브라우저에게 이벤트 핸들러가 스크롤을 막지 않을 것임을 알려줍니다. 이렇게 함으로써 성능 향상이 이루어질 수 있습니다.
    //이때마다 핸들러 함수에서 event.preventDefault()를 호출하면 브라우저가 스크롤 동작을 계속 기다려야 하므로 성능에 영향을 미칠 수 있습니다.
    //  passive: true를 사용하면 브라우저가 핸들러 함수에서 기본 동작을 막지 않을 것으로 예상하므로 성능이 향상됩니다.
    element.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      element.removeEventListener('scroll', handleScroll)
    }
  }, [ref, setState])

  return [ref, state]
}

export default useScroll
