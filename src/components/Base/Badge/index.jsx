import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const BadgeContainer = styled.div`
  position: relative;
  display: inline-block;
`

const Super = styled.sup`
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  font-size: 12px;
  color: white;
  border-radius: 20px;
  background-color: #f44;
  transform: translate(50%, -50%);
  &.dot {
    padding: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
`

const Badge = ({
  children,
  count,
  maxCount,
  showZero,
  dot = false,
  backgroundColor,
  textColor,
  ...props
}) => {
  const colorStyle = {
    backgroundColor,
    color: textColor
  }

  let badge = null
  if (dot === false && count) {
    badge = (
      <Super style={colorStyle}>
        {maxCount && count > maxCount ? `${maxCount}+` : count}
      </Super>
    )
  } else if (dot === false && count !== undefined) {
    badge = showZero ? <Super style={colorStyle}>0</Super> : null
  } else if (dot && count) {
    badge = (
      <Super
        className="dot"
        style={colorStyle}
      />
    )
  }

  return (
    <BadgeContainer {...props}>
      {children}
      {badge}
    </BadgeContainer>
  )
}
Badge.propTypes = {
  children: PropTypes.node.isRequired,
  count: PropTypes.number,
  maxCount: PropTypes.number,
  showZero: PropTypes.bool,
  dot: PropTypes.bool,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string
}

export default Badge
