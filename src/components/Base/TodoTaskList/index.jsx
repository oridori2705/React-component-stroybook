import styled from '@emotion/styled'
import TodoTask from '../TodoTask'
import { useTasks } from '../../../contexts/TaskProvider'

const UnorderedList = styled.ul`
  width: 400px;
  margin: 0;
  padding: 0;

  & > li {
    //첫 번째 li태그를 제외한다.
    &:not(:first-of-child) {
      margin-top: 8px;
    }
  }
`

const TodoTaskList = props => {
  const { tasks } = useTasks()
  return (
    <UnorderedList {...props}>
      {tasks.map(item => (
        <TodoTask
          key={item.id}
          id={item.id}
          content={item.content}
          complete={item.complete}
        />
      ))}
    </UnorderedList>
  )
}

export default TodoTaskList
