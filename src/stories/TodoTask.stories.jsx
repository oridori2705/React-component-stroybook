import TodoTask from '../components/TodoTask'

export default {
  title: 'Component/TodoTask',
  component: TodoTask
}

export const Default = () => {
  const task = {
    content: '출근하기',
    complete: false
  }
  return (
    <TodoTask
      content={task.content}
      complete={task.complete}
    />
  )
}
