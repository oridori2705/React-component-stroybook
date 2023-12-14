import styled from '@emotion/styled'
import ImageComponent from '../Image'
import { useEffect, useState } from 'react'
import AvatarGroup from './AvatarGroup'
import PropTypes from 'prop-types'

//리팩토링 방법 - 객체로 만들어 분기만들기
const ShapeToCssValue = {
  circle: '50%',
  round: '4px',
  sqaure: '0px'
}

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
  border: 1px solid #dadada;
  border-radius: ${({ shape }) => ShapeToCssValue[shape]};
  overflow: hidden;
  background-color: #eee;
  > img {
    transition: opacity 0.2s ease-out;
  }
`

const Avatar = ({
  lazy,
  threshold,
  src,
  size = 70,
  shape = 'circle',
  placeholder,
  alt,
  mode = 'cover',

  ...props
}) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const image = new Image()
    image.src = src
    image.onload = () => setLoaded(true)
  })

  return (
    <AvatarWrapper
      {...props}
      shape={shape}>
      <ImageComponent
        block
        lazy={lazy}
        threshold={threshold}
        width={size}
        height={size}
        src={src}
        placeholder={placeholder}
        alt={alt}
        mode={mode}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </AvatarWrapper>
  )
}

// props에서 __TYPE = "Avater"을 하게되면 props.__TYPE 으로 데이터가 안넘어 가진다. 그래서 이와 같이사용
Avatar.defaultProps = {
  __TYPE: 'Avatar'
}
Avatar.propTypes = {
  __TYPE: PropTypes.oneOf(['Avatar']), //상위에서 임의로 props를 이용해 __TYPE을 바꾸지 못하도록
  lazy: PropTypes.bool,
  threshold: PropTypes.number,
  src: PropTypes.string,
  size: PropTypes.number,
  shape: PropTypes.oneOf(['circle', 'round', 'square']),
  placeholder: PropTypes.string,
  alt: PropTypes.string,
  mode: PropTypes.oneOf(['contain', 'cover', 'fill'])
}

Avatar.Group = AvatarGroup

export default Avatar
