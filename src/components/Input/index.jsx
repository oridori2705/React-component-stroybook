import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  display: ${({ block }) => (block ? 'block' : 'inline-block')};
`

const Label = styled.label`
  display: block;
  font-size: 12px;
`

const StyledInput = styled.input`
  width: 100%;
  padding: 4px 8px;
  border: 1px solid ${({ invalid }) => (invalid ? 'red' : 'gray')};
  border-radius: 4px;
  box-sizing: border-box;
`

const Input = ({
  label,
  block = false,
  invaild = false,
  required = false,
  disabled = false,
  wrapperProps,
  readOnly = false,
  ...props
}) => {
  return (
    <Wrapper
      block={block}
      {...wrapperProps}>
      <Label>{label}</Label>
      <StyledInput
        invalid={invaild}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        {...props}
      />
    </Wrapper>
  )
}

Input.propTypes = {
  label: PropTypes.string,
  block: PropTypes.bool,
  invaild: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  wrapperProps: PropTypes.object,
  readOnly: PropTypes.bool
}

export default Input
