import { useCallback, useEffect, useMemo } from 'react'

//1,2,4,8인 이유 = 비트마스크처럼 사용하기위해
const ModifierBitMasks = {
  alt: 1,
  ctrl: 2,
  meta: 4,
  shift: 8
}

const ShiftKeys = {
  '~': '`',
  '!': '1',
  '@': '2',
  '#': '3',
  $: '4',
  '%': '5',
  '^': '6',
  '&': '7',
  '*': '8',
  '(': '9',
  ')': '0',
  _: '-',
  '+': '=',
  '{': '[',
  '}': ']',
  '|': '\\',
  ':': ';',
  '"': "'",
  '<': ',',
  '>': '.',
  '?': '/'
}

const Aliases = {
  win: 'meta',
  window: 'meta',
  cmd: 'meta',
  command: 'meta',
  esc: 'escape',
  opt: 'alt',
  option: 'alt'
}
//사용자가 누른 키의 이벤트를 받아서 처리하기 쉬운 데이터로 만든다. (키를 하나씩 저장함)
const getKeyCombo = e => {
  const key = e.key !== ' ' ? e.key.toLowerCase() : 'space'
  let modifiers = 0
  if (e.altKey) modifiers += ModifierBitMasks.alt
  if (e.ctrlKey) modifiers += ModifierBitMasks.ctrl
  if (e.metaKey) modifiers += ModifierBitMasks.meta
  if (e.shiftKey) modifiers += ModifierBitMasks.shift

  return { modifiers, key }
}
//미리 지정한 combo 값을 파싱해준다. ->사용자가 누른 키값과 같은지 비교하기 위해
const parseKeyCombo = combo => {
  const pieces = combo.replace(/\s/g, '').toLowerCase().split('+')
  let modifiers = 0
  let key
  for (const piece of pieces) {
    if (ModifierBitMasks[piece]) {
      modifiers += ModifierBitMasks[piece]
    } else if (ShiftKeys[piece]) {
      // ctrl + !는 사실 ctrl + shift + 1 이니까 shift도 따로 분기처리해줘야 함
      modifiers += ModifierBitMasks.shift
      key = ShiftKeys[piece]
    } else if (Aliases[piece]) {
      //esc키나 window키 같은 것도 분기처리해줘야함
      key = Aliases[piece]
    } else {
      key = piece
    }
  }

  return { modifiers, key }
}

//파싱한 combo와 사용자가 키를 눌러서 이벤트로 받아온 combo가 같은지 검사해줘야 함
const comboMatches = (a, b) => {
  return a.modifiers === b.modifiers && a.key === b.key
}

const useHotKey = hotkeys => {
  const localKeys = useMemo(() => hotkeys.filter(k => !k.global), [hotkeys])
  const globalKeys = useMemo(() => hotkeys.filter(k => k.global), [hotkeys])

  /*
  {global : global 여부, 
  combo : 단축키, 
  callbackName: 사용할 이벤트 이름, 
  e: 이벤트 객체}
  */
  const invokeCallback = useCallback(
    (global, combo, callbackName, e) => {
      console.log(combo)
      for (const hotkey of global ? globalKeys : localKeys) {
        // 단축키 처리
        if (comboMatches(parseKeyCombo(hotkey.combo), combo)) {
          //callbackName = onKeyDown, onKeyUp
          hotkey[callbackName] && hotkey[callbackName](e)
        }
      }
    },
    [localKeys, globalKeys]
  )
  //global 처리함수
  const handleGlobalKeyDown = useCallback(
    e => {
      invokeCallback(true, getKeyCombo(e), 'onKeyDown', e)
    },
    [invokeCallback]
  )

  const handleGlobalKeyUp = useCallback(
    e => {
      invokeCallback(true, getKeyCombo(e), 'onKeyUp', e)
    },
    [invokeCallback]
  )
  //local 처리함수
  //e.nativeEvent : 원본 이벤트의 속성 및 메서드에 직접적으로 접근할 수 있다
  const handleLocalKeyDown = useCallback(
    e => {
      invokeCallback(
        false,
        getKeyCombo(e.nativeEvent),
        'onKeyDown',
        e.nativeEvent
      )
      console.log('함수 렌더링됨!')
    },
    [invokeCallback]
  )

  const handleLocalKeyUp = useCallback(
    e => {
      invokeCallback(
        false,
        getKeyCombo(e.nativeEvent),
        'onKeyUp',
        e.nativeEvent
      )
    },
    [invokeCallback]
  )

  //global을 위한 전역이벤트 등록
  useEffect(() => {
    document.addEventListener('keydown', handleGlobalKeyDown)
    document.addEventListener('keyup', handleGlobalKeyUp)

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown)
      document.removeEventListener('keyup', handleGlobalKeyUp)
    }
  }, [handleGlobalKeyDown, handleGlobalKeyUp])
  // local은 사용자가 정하도록 return 해줌
  return { handleKeyDown: handleLocalKeyDown, handleKeyUp: handleLocalKeyUp }
}

export default useHotKey

/*
1. 상위에서 미리 지정할 hotkeys 배열을 가져온다
2. hotkeys 배열을 global과 local로 나눈다.
3. 전역에 global 키 이벤트를 등록한다. 콜백함수는 global용으로 등록한다.
4. local 키 이벤트는 사용자가 지정하도록 다시 내보내 준다. 콜백함수는 local용이다.
5. 이제 전역에서는 키보드를 누르면 키이벤트가 계속 들어간다. 이는 getKeyCombo에서 처리하기 쉬운 데이터로 가공한다. { modifiers, key } 형태다
6. 이때 등록해준 콜백함수는 계속해서 invokeCallback으로 해당 이벤트를 검사한다.
7. invokeCallback에서는 먼저 들어온 데이터가 global인지 아닌지 판단해서 1번에서 나눠준 hotkeys배열을 사용한다.
8. 미리 지정된 hotkeys를 하나씩 반복하면서 미리지정한 커맨드와 현재 사용자가 입력한 커맨드가 같은지 확인한다.
8-1. 미리 지정된 hotkeys는 parseKeyCombo를 이용해서 비교하기 쉽게 가공한다. { modifiers, key } 형태다
8-2. 가공한 hotkeys와 입력한 커맨드가 같은지 comboMatches 함수로 확인한다.
9. 같다면 callbackName을 이용해서 미리 지정한 커맨드에 같이 지정되어있는 콜백함수를 실행한다. hotkey[callbackName](e) - > onKeyDown: () => {alert('meta+shift+k')}

*/
