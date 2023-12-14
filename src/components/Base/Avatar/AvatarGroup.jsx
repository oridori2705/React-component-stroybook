import React from 'react'
import PropTypes from 'prop-types'

const AvatarGroup = ({ children, shape = 'circle', size = 70, ...props }) => {
  // children 요소 validation 후 style 적용하는 방법
  const avatars = React.Children.toArray(children)
    .filter(el => {
      if (React.isValidElement(el) && el.props.__TYPE === 'Avatar') {
        return true
      }
      console.warn("Only accepts Avatar as it's children")
      return false
    })
    .map((avatar, index, avatars) => {
      return React.cloneElement(avatar, {
        ...avatar.props,
        size,
        shape,
        style: {
          ...avatar.props.style,
          marginLeft: -size / 5,
          zIndex: avatars.length - index
        }
      })
    })
  return (
    <div
      {...props}
      style={{ paddingLeft: size / 5 }}>
      {avatars}
    </div>
  )
}

AvatarGroup.propTypes = {
  children: PropTypes.node.isRequired,
  shape: PropTypes.oneOf(['circle', 'round', 'square']),
  size: PropTypes.number
}

export default AvatarGroup
