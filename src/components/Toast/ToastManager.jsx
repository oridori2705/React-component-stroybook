import styled from '@emotion/styled'
import { useCallback, useEffect, useState } from 'react'
import { v4 } from 'uuid'
import ToastItem from './ToastItem'
import PropTypes from 'prop-types'

//오른쪽 위에 Toast가 나오도록 스타일링
const Container = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1500;
`

//Toast들을 관리하는 컴포넌트 bind: createToast 함수를 넘겨준다.
const ToastManager = ({ bind }) => {
  const [toasts, setToasts] = useState([])

  const createToast = useCallback((message, duration) => {
    const newToast = {
      id: v4(),
      message,
      duration
    }
    //업데이터 함수 이용
    setToasts(oldToasts => [...oldToasts, newToast])
  }, [])

  const removeToast = useCallback(id => {
    setToasts(oldToasts => oldToasts.filter(toast => toast.id !== id))
  }, [])

  //상위에서 bind받아온 것에 함수를 담아서 다시 보내준다.
  useEffect(() => {
    bind(createToast)
  }, [bind, createToast])

  return (
    <Container>
      {toasts.map(({ id, message, duration }) => (
        <ToastItem
          message={message}
          duration={duration}
          key={id}
          onDone={() => removeToast(id)}
        />
      ))}
    </Container>
  )
}

ToastManager.propTypes = {
  bind: PropTypes.func.isRequired
}

export default ToastManager
