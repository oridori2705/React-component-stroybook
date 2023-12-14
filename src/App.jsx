import { useState } from 'react'
import Paint from './components/Paint'
import { DashPlugin, EraserPlugin, PenPlugin } from './components/Paint/plugins'

const App = () => {
  const [command, setCommand] = useState('pen') // 그리기 도구 바꾸는 상태
  const [lineWidth, setLineWidth] = useState(1) // 굵기 바꾸는 상태
  const [color, setColor] = useState('#000000') // color 바꾸는 상태
  return (
    <div>
      <div>
        <button onClick={() => setCommand('pen')}>Pen</button>
        <button onClick={() => setCommand('eraser')}>Eraser</button>
        <button onClick={() => setCommand('dash')}>Dash</button>
        <input
          type="range"
          min={1}
          max={50}
          defaultValue={1}
          onChange={e => setLineWidth(e.target.value)}
        />
        <input
          type="color"
          onChange={e => setColor(e.target.value)}
        />
      </div>
      <Paint
        command={command}
        lineWidth={lineWidth}
        color={color}
        plugins={[new PenPlugin(), new EraserPlugin(), new DashPlugin()]}
        style={{ border: '1px solid black' }}
      />
    </div>
  )
}

export default App

/*
// Todo 앱
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


*/

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
