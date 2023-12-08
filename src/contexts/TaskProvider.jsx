import { createContext, useContext } from 'react'
import { v4 } from 'uuid' //랜덤한 id를 만들어줌
import PropTypes from 'prop-types'
import useLocalStorage from '../hooks/useLocalStorage'

const TaskContext = createContext()

//컨슈머 - 편하게 사용하기위해 커스텀 훅처럼 작성, 원래는 컴포넌트마다 아래와 같이 호출하면됨
export const useTasks = () => useContext(TaskContext)

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage('key', [])

  const addTask = content => {
    setTasks([
      ...tasks,
      {
        id: v4(),
        content,
        complete: false
      }
    ])
  }

  const updateTask = (id, status) => {
    setTasks(
      tasks.map(item => (item.id === id ? { ...item, complete: status } : item))
    )
  }

  const removeTask = id => {
    setTasks(tasks.filter(item => item.id !== id))
  }
  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  )
}

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default TaskProvider
