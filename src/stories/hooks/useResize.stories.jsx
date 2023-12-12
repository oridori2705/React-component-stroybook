import styled from '@emotion/styled'
import { useCallback, useState } from 'react'
import Image from '../../components/Image'
import useResize from '../../hooks/useResize'

export default {
  title: 'Hook/useResize'
}

const Background = styled.div`
  width: 100%;
  height: 400px;
  background-color: blue;
`

export const Default = () => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const handleResize = useCallback(rect => {
    setImageSize({ width: rect.width, height: rect.height })
  }, [])
  const ref = useResize(handleResize)
  console.log('렌더링!')
  return (
    <Background ref={ref}>
      <Image
        width={imageSize.width}
        height={imageSize.height}
        src="https://picsum.photos/1000"
        mode="contain"
      />
    </Background>
  )
}

{
  /*
1. useSize에서 ResizeObserver을 통해 지정된 element 감시, 
2. 지정된 element의 크기가 바뀌면 ResizeObserver에 등록한 useResize(rect=>{...})함수 호출 
3. imageSize가 바뀜
4. 렌더링됨
5. useResize에 등록한 함수가 바뀜(함수는 객체니까)
6. useResize에서 useEffect로 saveHandler에 등록된 함수만 바꿔줌

-> useEffect가 계속 호출되는것을 줄이기 위해 useCallback 사용
1 . const handleResize = useCallback(rect => {
    setImageSize({ width: rect.width, height: rect.height })
  }, []) 로 useCallback 사용, 빈 배열을 등록해서 처음 렌더링 될때만 호출

*/
}
