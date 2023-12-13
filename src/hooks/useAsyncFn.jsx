import { useCallback, useRef, useState } from 'react'

//비동기 로직을 제거하기 위해 사용되는 훅
const useAsyncFn = (fn, deps) => {
  // 만약 비동기 로직이 여러번 A요청과 B요청이 일어났을 때
  // A요청이 늦는다면 state에는 늦은 A요청의 값이 최종적으로 할당된다.(B는 없어짐)
  // 그래서 제일 마지막에 요청한 비동기 로직만 받을 수 있도록 할 것이다.
  const lastCallId = useRef(0)
  // { 로딩 여부, 결과적으로 반환되는 값, 에러}
  const [state, setState] = useState({ isLoading: false })

  const callback = useCallback((...args) => {
    // id값을 증가시켜서 비동기 요청에 id를 부여함
    const callId = ++lastCallId.current
    //로딩중이 아닐 때 로딩으로 만들어줌
    if (!state.isLoading) {
      setState({ ...state, isLoading: true })
    }
    //함수 호출 후 비동기로직이 끝나면
    return fn(...args).then(
      value => {
        // 비동기 로직 성공 시 그 값을 넣어줌
        callId === lastCallId.current && setState({ value, isLoading: false }) // 마지막 요청인지 검사하고 state를 할당함
        return value
      },
      error => {
        // 비동기 로직 실패 시 에러 값을 넣어줌
        callId === lastCallId.current && setState({ error, isLoading: false })
        return error
      }
    )
    // eslint-disable-next-line
  }, deps)

  return [state, callback]
}

export default useAsyncFn
