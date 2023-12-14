import React from 'react'
import PropTypes from 'prop-types'

const Spacer = ({ children, type = 'horizontal', size = 8, ...props }) => {
  const spacerStyle = {
    ...props.style,
    display: type === 'vertical' ? 'block' : 'inline-block',
    verticalAlign: type === 'horizontal' ? 'middle' : undefined
  }

  // React.Children.toArray(children) : 자식 컴포넌트 접근
  // .filter(el => React.isValidElement(el)) : 유효한 엘리먼트가 맞는지
  // React.cloneElement(el , { ... }) : 엘리먼트를 클론해서 속성을 넣어준다.
  // marginRight와 marginBottom을 type에 따라 부여해주는 로직
  const nodes = React.Children.toArray(children)
    .filter(el => React.isValidElement(el))
    .map((el, i, els) => {
      return React.cloneElement(el, {
        ...el.props,
        style: {
          ...el.props.style,
          marginRight:
            type === 'horizontal' && i !== els.length - 1 ? size : undefined,
          marginBottom:
            type === 'vertical' && i !== els.length - 1 ? size : undefined
        }
      })
    })

  return (
    <div
      {...props}
      style={spacerStyle}>
      {nodes}
    </div>
  )
}

Spacer.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.object
}

export default Spacer
