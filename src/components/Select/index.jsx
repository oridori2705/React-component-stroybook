import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  display: ${({ block }) => (block ? 'block' : 'inline-block')};
`
const Label = styled.label`
  display: block;
  font-size: 12px;
`

const StyledSelect = styled.select`
  width: 100%;
  padding: 4px 8px;
  border: 1px solid ${({ invalid }) => (invalid ? 'red' : 'gray')};
  border-radius: 4px;
  box-sizing: border-box;
`

const Select = ({
  data,
  label,
  placeholder,
  block = false,
  invalid = false,
  required = false,
  disabled = false,
  wrapperProps,
  ...props
}) => {
  // data는 string과 object 두 가지 방법으로 받음
  const formattedData = data.map(item =>
    typeof item === 'string' ? { label: item, value: item } : item
  )

  const options = formattedData.map(item => (
    <option
      key={item.value}
      value={item.value}>
      {item.label}
    </option>
  ))
  //option의 hidden : true일 경우 Select를 클릭할 경우 옵션에서 보이지 않게 함
  if (placeholder) {
    options.unshift(
      <option
        key="placeholder"
        value=""
        hidden>
        {placeholder}
      </option>
    )
  }

  return (
    <Wrapper
      block={block}
      {...wrapperProps}>
      <Label>{label}</Label>
      <StyledSelect
        invalid={invalid}
        required={required}
        disabled={disabled}
        {...props}>
        {options}
      </StyledSelect>
    </Wrapper>
  )
}

Select.propTypes = {
  data: PropTypes.array.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  block: PropTypes.bool,
  invalid: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  wrapperProps: PropTypes.object
}

export default Select
