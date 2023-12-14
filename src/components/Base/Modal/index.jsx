import styled from '@emotion/styled'
import { useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { useClickAway } from '../../../hooks'

const BackgroundDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`

const Modal = ({
  children,
  width = 500,
  height,
  visible = false,
  onClose,
  ...props
}) => {
  //빈 곳 클릭시 모달 닫기 위해 useClickAway 사용
  const ref = useClickAway(() => {
    onClose && onClose()
  })

  const containerStyle = useMemo(
    () => ({
      width,
      height
    }),
    [width, height]
  )

  //모달은 어떤 요소의 자식이 아니라 body요소의 자식이어야한다.
  const el = useMemo(() => document.createElement('div'), [])
  useEffect(() => {
    document.body.appendChild(el)
    return () => {
      document.body.removeChild(el)
    }
  })
  //React Portal을 이용해서 위에서 정의한 el에 styled컴포넌트로 만들어준 아래 DOM들을 넣어줘야한다.
  return ReactDOM.createPortal(
    <BackgroundDim style={{ display: visible ? 'block' : 'none' }}>
      <ModalContainer
        ref={ref}
        {...props}
        style={{ ...props.style, ...containerStyle }}>
        {children}
      </ModalContainer>
    </BackgroundDim>,
    el
  )
}

export default Modal
