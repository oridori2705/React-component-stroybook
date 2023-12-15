//useRafState를 통해 사용자 정의함수를 만들어서 상위컴포넌트에 제공한다.
//즉 상위컴포넌트에 하위컴포넌트를 함수호출로 제외할 수 있게 된다.
import { useRef, useImperativeHandle, forwardRef } from 'react'

// 자식 컴포넌트
const ChildComponent = forwardRef((props, ref) => {
  const internalState = useRef(null) // props된 ref가 아닌 따로 ref를 또 만들어줘야함

  // useImperativeHandle을 사용하여 외부에서 접근 가능한 메서드나 속성을 정의
  useImperativeHandle(ref, () => ({
    // 외부에서 접근 가능한 메서드
    myMethod() {
      console.log('Method called in ChildComponent')
    },
    // 외부에서 접근 가능한 속성
    myProperty: internalState.current
  }))

  return <div>Child Component</div>
})
ChildComponent.displayName = 'Child Component'

// 부모 컴포넌트
const ParentComponent = () => {
  const childRef = useRef(null)

  const handleButtonClick = () => {
    // 부모 컴포넌트에서 자식 컴포넌트의 메서드 호출
    childRef.current.myMethod()
  }

  return (
    <div>
      <button onClick={handleButtonClick}>Call Child Method</button>
      <ChildComponent ref={childRef} />
    </div>
  )
}

export default ParentComponent
