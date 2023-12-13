import { useState } from 'react'
import useHotKey from '../../hooks/useHotKey'

export default {
  title: 'Hook/useHotKey'
}
//global은 페이지 어디에있든 커맨드를 사용가능함을 의미
//global이 없다면 로컬 - 특정 엘리멘트가 active상태일 때 사용가능
export const Default = () => {
  const [value, setValue] = useState('')
  //hotkeys에는 미리 지정할 커맨드를 저장해놓음
  const hotkeys = [
    {
      global: true,
      combo: 'meta+shift+k',
      onKeyDown: () => {
        alert('meta+shift+k')
      }
    },
    {
      combo: 'esc',
      onKeyDown: () => {
        setValue('') //esc를 누르면 값을 지운다.
      }
    }
  ]

  const { handleKeyDown } = useHotKey(hotkeys)

  return (
    <div>
      <div>useHotKey 테스트</div>
      <input
        onKeyDown={handleKeyDown}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  )
}
