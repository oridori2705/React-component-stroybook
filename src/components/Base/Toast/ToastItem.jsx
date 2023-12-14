import Text from '../Text'
import { useTimeout } from '../../../hooks'
import styled from '@emotion/styled'
import { useState } from 'react'
import PropTypes from 'prop-types'

const Container = styled.div`
  position: relative;
  display: flex;
  width: 450px;
  height: 70px;
  padding: 0 20px;
  align-items: center;
  border-radius: 4px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border: 1px solid #ccc;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  opacity: 1;
  transition: opacity 0.4s ease-out; // opacity에 효과를 줌

  //첫번째 요소만 아래에서 위로 나타나는 애니메이션
  &:first-of-type {
    animation: move 0.4s ease-out forwards;
  }

  //첫번째 요소를 제외하고
  &:not(:first-of-type) {
    margin-top: 8px;
  }

  @keyframes move {
    0% {
      margin-top: 80px;
    }
    100% {
      margin-top: 0;
    }
  }
`

//Progressbar만드는 법
const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 4px;
  background-color: #44b;
  animation-name: progress;
  animation-timing-function: linear; //애니메이션이 시작부터 끝까지 어떤 속도로 진행되는지를 결정
  animation-fill-mode: forwards; //애니메이션이 끝난 후에 어떻게 유지할지를 정의 - forward 애니메이션이 끝난 후에 마지막 프레임의 상태를 유지하게 됩니다. 즉 프로그레스바가 완료되면 그 상태 유지

  @keyframes progress {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
`

const ToastItem = ({ message, duration, onDone }) => {
  //opacity를 위한 상태
  const [show, setShow] = useState(true)

  //useTimeout 훅 사용
  useTimeout(() => {
    setShow(false)
    setTimeout(() => onDone(), 400)
  }, duration)

  return (
    <Container style={{ opacity: show ? 1 : 0 }}>
      <ProgressBar style={{ animationDuration: `${duration}ms` }} />
      <Text>{message}</Text>
    </Container>
  )
}

ToastItem.propTypes = {
  message: PropTypes.string,
  duration: PropTypes.number,
  onDone: PropTypes.func
}

export default ToastItem
