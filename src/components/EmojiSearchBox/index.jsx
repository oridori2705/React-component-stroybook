import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const Input = styled.input`
  width: 100%;
  padding: 4px 8px;
  border: 1px solid gray;
  border-radius: 4px;
  box-sizing: border-box;
`

const EmojiSearchBox = ({ onSearch }) => {
  return <Input onChange={e => onSearch(e.target.value)} />
}

EmojiSearchBox.propTypes = {
  onSearch: PropTypes.func
}

export default EmojiSearchBox
