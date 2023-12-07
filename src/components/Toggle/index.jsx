import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import useToggle from '../../hooks/useToggle'

const ToggleContainer = styled.label`
  display: inline-block;
  cursor: pointer;
  user-select: none; //안쪽에서 드래그가 되는 것을 방지
`

const ToggleSwitch = styled.div`
  width: 64px;
  height: 30px;
  padding: 2px;
  box-sizing: border-box;
  background-color: #ccc;
  border-radius: 15px;
  transition: background-color 0.2s ease-out;
  &:after {
    content: '';
    position: relative;
    left: 0;
    display: block;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: white;
    transition: left 0.2s ease-out;
  }
`

const ToggleInput = styled.input`
  display: none;

  //&:checked : Toggle이 on 상태인 것을 뜻함
  // + : 인접 셀렉터
  &:checked + div {
    background: lightgreen;
  }
  &:checked + div:after {
    left: calc(100% - 26px);
  }
  &:disabled + div {
    opacity: 0.7;
    cursor: not-allowed;
    &:after {
      opacity: 0.7;
    }
  }
`

const Toggle = ({ name, on = false, disabled, onChange, ...props }) => {
  const [checked, toggle] = useToggle(on)

  const handleToggle = () => {
    toggle()
    onChange && onChange()
  }

  return (
    <ToggleContainer {...props}>
      <ToggleInput
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={handleToggle}
      />
      <ToggleSwitch />
    </ToggleContainer>
  )
}

Toggle.propTypes = {
  name: PropTypes.string,
  on: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
}

export default Toggle
