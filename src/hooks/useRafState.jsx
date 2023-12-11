import { useCallback, useRef, useState } from 'react'

//RequestAnimationFrame
//쉽게 말하면 상태를 부드럽게 업데이트 하는 것이다.
const useRafState = initialState => {
  const frame = useRef(0) //frame: requestAnimationFrame의 ID를 저장하기 위한 useRef 객체
  const [state, setState] = useState(initialState)

  //새로운 상태를 받아오면 이전에 예약된 애니메이션 프레임을 취소하고 새로운 애니메이션 프레임을 요청하여 상태를 업데이트한다.
  const setRafState = useCallback(value => {
    cancelAnimationFrame(frame.current)
    //requestAnimationFrame은 브라우저에게 다음 리페인팅이 발생하기 전에 콜백 함수를 실행하도록 예약하는 함수입니다.
    frame.current = requestAnimationFrame(() => {
      setState(value) //이 함수는 애니메이션 프레임마다 실행된다.
    })
  }, [])

  return [state, setRafState]
}

export default useRafState
/*
requestAnimationFrame은 JavaScript에서 사용되는 함수로, 웹 애니메이션 및 그 외의 반복 작업을 수행하는데 사용됩니다. 
이 함수는 브라우저에게 다음 리페인팅이 발생하기 전에 지정된 콜백 함수를 실행하도록 요청합니다. 
이는 일반적으로 웹 애니메이션을 부드럽게 만들고 성능을 최적화하는 데 도움이 됩니다.

requestAnimationFrame을 사용하는 것이 setTimeout이나 setInterval보다 선호되는 이유 중 하나는 
브라우저가 애니메이션을 효율적으로 처리하기 위해 내부적으로 최적화되기 때문입니다. 
브라우저는 주기적인 리페인팅을 처리하면서 화면의 주사율에 맞추어 애니메이션을 부드럽게 표시할 수 있습니다.

requestAnimationFrame을 사용하면 브라우저가 현재 활성 탭이 아닌 경우 애니메이션을 중지하거나 
더 낮은 주파수로 실행하여 성능을 최적화할 수 있습니다. 
따라서 이 함수는 성능 면에서 뛰어나며, 특히 모바일 기기에서의 웹 앱 개발에 유용합니다.
*/
