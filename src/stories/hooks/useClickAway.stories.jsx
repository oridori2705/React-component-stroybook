import styled from '@emotion/styled'
import { useCallback, useState } from 'react'
import useClickAway from '../../hooks/useClickAway'

export default {
  title: 'Hook/useClickAway'
}

const Popover = styled.div`
  width: 200px;
  height: 200px;
  border: 2px solid black;
  background-color: #eee;
`

export const Default = () => {
  const [show, setShow] = useState(false)

  //useCallback을 사용해서 handler의 useEffect 호출 성능 최적화
  const handleOutsideClick = useCallback(e => {
    // button도 영역 외의 요소이기 때문에 분기 처리 필요
    if (e.target.tagName !== 'BUTTON') {
      setShow(false)
    }
  }, [])
  const ref1 = useClickAway(handleOutsideClick)

  return (
    <div>
      <button onClick={() => setShow(true)}>Show</button>
      <Popover
        ref={ref1}
        style={{ display: show ? 'block' : 'none' }}>
        Popover1
      </Popover>
    </div>
  )
}

{
  /*
헷갈렸던 점
1. ref를 등록해준 컴포넌트에는 클릭이벤트를 넘겨주지 않는데 어떻게 useClickAway(e => {...});에서
e 인자가 마우스이벤트를 받는 걸까?
 -> ref가 생성되면 useClickAway로가서 ref도 생성하고, 이런저런 일을 한다. 
 -> 그리고 이 때 전역에 이벤트를 등록한다 (document.addEventListener)
 -> 그리고 이 이벤트의 콜백함수를 useClickAway(e => {...});로 등록한다.
 -> 그래서 클릭이벤트가 일어나면 useClickAway(e => {...}); 의 e는 Event 객체가 된다.

 2. 핸들러가 바뀔때 핸들러함수만 실행해주는 saveHandler를 작성해줬다. 근데 핸들러가 안바뀌는데도 useEffect가 실행된다.
 왜 그런걸까?
 - 함수도 객체라서 이벤트가 발생할 때마다 새로운 함수 객체가 생성되기때문에 useEffect에 적용한 Handler는 계속 바뀌게 된다!

 3.왜 show 클릭-> 영역외 클릭 후 영역외 부분를 클릭하면 또 렌더링이 될까?(렌더링이아닌 것같은 로그가 또 출력됨)
*/
}
