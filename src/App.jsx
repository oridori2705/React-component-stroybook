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
