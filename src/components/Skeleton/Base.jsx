import styled from '@emotion/styled'

const Base = styled.div`
  display: inline-block;
  border-radius: 4px;
  background-image: linear-gradient(
    90deg,
    #dfe3e8 0px,
    #efefef 40px,
    #dfe3e8 80px
  );
  background-size: 200% 100%;
  background-position: 0 center;
  animation:
    skeleton--zoom-in 0.2s ease-out,
    skeleton--loading 2s infinite linear;
  // 없어졌다가 나타나는 효과(새로고침했을 때)
  @keyframes skeleton--zoom-in {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  // 왼쪽에서 오른쪽으로 가는 효과 - 로딩이 천천히 가도록 50%에서 -100%을 적용해 천천히 반복됨
  @keyframes skeleton--loading {
    0% {
      background-position-x: 100%;
    }
    50% {
      background-position-x: -100%;
    }
    100% {
      background-position-x: -100%;
    }
  }
`

export default Base
