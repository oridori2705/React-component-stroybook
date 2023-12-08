import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import Toggle from '../Toggle'

const ListItem = styled.li`
  display: flex;
  width: 400px;
  height: 40px;
  padding: 0 8px;
  box-sizing: border-box;
  align-items: center;
  background-color: white;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  list-style: none;
  border-radius: 16px;
`

const Content = styled.span`
  flex: 1;
  margin-left: 8px;
  font-size: 14px;
`

const RemoveButton = styled.button`
  width: 60px;
  height: 24px;
  margin-left: 8px;
  color: white;
  border-radius: 8px;
  border: none;
  background-color: red;
  cursor: pointer;
`
//content는 provider를 받아서 처리
const TodoTask = ({ content, complete, ...props }) => {
  return (
    <ListItem>
      <Toggle on={complete} />
      <Content>{content}</Content>
      <RemoveButton>Remove</RemoveButton>
    </ListItem>
  )
}

TodoTask.propTypes = {
  content: PropTypes.string,
  complete: PropTypes.bool,
  props: PropTypes.object
}

export default TodoTask
