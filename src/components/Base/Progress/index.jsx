import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const ProgressContainer = styled.div`
  position: relative;
  width: 100%;
  height: 16px;
`
const Rail = styled.div`
  position: absolute;
  top: 6px;
  left: 0;
  width: 100%;
  height: 8px;
  border-radius: 2px;
  background-color: #aaa;
`

const Track = styled.div`
  position: absolute;
  top: 6px;
  left: 0;
  width: 0;
  height: 8px;
  border-radius: 2px;
  background-color: #44b;

  background-size: 20px 20px;
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent 100%
  );
  animation: move 1000ms linear infinite;
  transition: width 100ms linear;
  @keyframes move {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 40px 0;
    }
  }
`

const Progress = ({ value, ...props }) => {
  return (
    <ProgressContainer {...props}>
      <Rail />
      <Track style={{ width: `${value}%` }} />
    </ProgressContainer>
  )
}

Progress.propTypes = {
  value: PropTypes.number
}

export default Progress

/*
잡는 곳을 핸들
움직일 수 있는 영역을 레일
채운 영역을 트랙
 */
