import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import Toggle from '../Toggle'
import { useTasks } from '../../contexts/TaskProvider'

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
  text-decoration: ${({ complete }) => (complete ? 'line-through' : 'none')};
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
const TodoTask = ({ id, content, complete, ...props }) => {
  const { updateTask, removeTask } = useTasks()
  return (
    <ListItem
      key={id}
      {...props}>
      <Toggle
        on={complete}
        onChange={e => updateTask(id, e.target.checked)}
      />
      <Content complete={complete}>{content}</Content>
      <RemoveButton onClick={() => removeTask(id)}>Remove</RemoveButton>
    </ListItem>
  )
}

TodoTask.propTypes = {
  id: PropTypes.string,
  content: PropTypes.string,
  complete: PropTypes.bool,
  props: PropTypes.object
}

export default TodoTask
