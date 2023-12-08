import styled from '@emotion/styled'
import TodoTask from '../TodoTask'

const UnorderedList = styled.ul`
  width: 400px;
  margin: 0;
  padding: 0;

  & > li {
    //첫 번째 li태그를 제외한다.
    &:not(:first-child) {
      margin-top: 8px;
    }
  }
`

const TodoTaskList = props => {
  return (
    <UnorderedList {...props}>
      <TodoTask content="Test" />
      <TodoTask content="Test" />
      <TodoTask content="Test" />
    </UnorderedList>
  )
}

export default TodoTaskList
