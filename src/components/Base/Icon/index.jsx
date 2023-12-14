/*
Vite는 기본적으로 ES Module 방식을 사용하기 때문에, 
require 문(CJS)을 사용하면 require is not defined 에러를 출력한다.
이는 vite 프로젝트에서 require를 사용할 수 있게끔 도와주는 플러그인을 설치하여 해결가능하다.
npm i -D vite-plugin-require

*/
import * as feather from 'feather-icons'
import { Buffer } from 'buffer'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
// i 태그의 크기가 정상적으로 나오도록 해결
const IconWrapper = styled.i`
  display: inline-block;
`

const Icon = ({
  name,
  size = 16,
  rotate,
  strokeWidth = 2,
  color = '#222',
  ...props
}) => {
  // i 태그의 크기가 정상적으로 나오도록 해결
  const shapeStyle = {
    width: size,
    height: size,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
    ...props.style
  }
  const iconStyle = {
    'stroke-width': strokeWidth,
    stroke: color,
    width: size,
    height: size
  }
  const icon = feather.icons[name]

  const svg = icon ? icon.toSvg(iconStyle) : ''

  const base64 = Buffer.from(svg, 'utf8').toString('base64')

  return (
    <IconWrapper
      {...props}
      style={shapeStyle}>
      <img
        src={`data:image/svg+xml;base64,${base64}`}
        alt={name}
      />
    </IconWrapper>
  )
}

Icon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  rotate: PropTypes.number,
  strokeWidth: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object
}

export default Icon
