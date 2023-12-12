import { useCallback, useEffect } from 'react'

/*
targetKey : 어떤 키를 입력받는지
*/
const useKey = (event = 'keydown', targetKey, handler) => {
  //handleKey함수는 이벤트 콜백함수로 등록되어있으므로 event를 받아온다.
  const handleKey = useCallback(
    ({ key }) => {
      if (key === targetKey) {
        handler()
      }
    },
    [targetKey, handler]
  )

  useEffect(() => {
    window.addEventListener(event, handleKey)

    return () => {
      window.removeEventListener(event, handleKey)
    }
  }, [event, targetKey, handleKey])
}

export default useKey
