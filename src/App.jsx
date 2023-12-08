import styled from '@emotion/styled'
import Header from './components/Header'
import TodoNewTaskForm from './components/TodoNewTaskForm'
import TodoTaskList from './components/TodoTaskList'
import TaskProvider from './contexts/TaskProvider'

const Container = styled.div`
  width: 400px;
  margin: 0 auto;
`

function App() {
  return (
    <TaskProvider>
      <Container>
        <Header>Todo</Header>
        <TodoNewTaskForm />
        <TodoTaskList css={{ marginTop: 16 }} />
      </Container>
    </TaskProvider>
  )
}

export default App

/*
// 이모지 검색 APP
import { useState } from 'react'
import EmojiHeader from './components/EmojiHeader'
import SearchBox from './components/EmojiSearchBox'
import emojiJson from './data/emoji.json'
import EmojiList from './components/EmojiList'

function App() {
  const [keyword, setKeyword] = useState('')

  return (
    <div>
      <EmojiHeader />
      <SearchBox onSearch={setKeyword} />
      <EmojiList
        emojis={emojiJson}
        keyword={keyword}
      />
    </div>
  )
}

export default App

*/
