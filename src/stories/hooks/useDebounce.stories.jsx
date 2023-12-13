import { Fragment, useState } from 'react'
import useDebounce from '../../hooks/useDebounce'

export default {
  title: 'Hook/useDebounce'
}

const companies = [
  'Cobalt',
  'Grepp',
  'Kakao',
  'Naver',
  'Daangn',
  'Coupang',
  'Line',
  'Woowahan'
]

export const Default = () => {
  const [value, setValue] = useState('')
  const [result, setResult] = useState([])

  useDebounce(
    () => {
      if (value === '') setResult([])
      else {
        setResult(
          companies.filter(company =>
            company.toLowerCase().includes(value.toLowerCase())
          )
        )
      }
    },
    300,
    [value]
  )

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <div>
        {result.map(item => (
          <Fragment key={item}>
            {item}
            <br />
          </Fragment>
        ))}
      </div>
    </div>
  )
}

/*
  1. input 입력 시  value 상태 변경
  2. useDebounce는 value가 바뀌면 실행됨 -> useDebounce는 useEffect가 있어서 의존성인 value가 바뀌면 실행된다.
  3. useDebounce안의 콜백 함수는 useTimeoutFn의 run안으로 들어가고, 주어진 300ms 후에 콜백함수가 실행된다. -> 300ms이후 관련 검색어 출력
  4. 만약 입력이 300ms안에 일어난다면 useDebounce는 의존성으로 명시된 value가 바뀜으로써 useEffect에서 useTimeoutFn의 run이 다시 실행되고,
  5. 기존에 진행되던 useTimeoutFn의 run은 clear되고 기존의 콜백함수를 setTimout으로 실행한다.


  중요한 점은 useDebounce hook은 useTimoutFn hook의 run을 useEffect에 넣어준 hook이다.
  그래서 의존성에 명시된 값이 변경되면 useTimeoutFn의 run이 다시 실행된다.(useTimeoutFn이 다시실행되면 기존의 setTimeout은 clear됨)
*/
