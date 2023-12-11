import styled from '@emotion/styled'
import React, { useMemo, useState } from 'react'
import TabItem from './TabItem'
import PropTypes from 'prop-types'

const childrenToArray = (children, types) => {
  return React.Children.toArray(children).filter(element => {
    if (React.isValidElement(element) && types.includes(element.props.__TYPE)) {
      return true
    }

    console.warn(
      `Only accepts ${
        Array.isArray(types) ? types.join(', ') : types
      } as it's children.`
    )
    return false
  })
}

const TabItemContainer = styled.div`
  border-bottom: 2px solid #ddd;
  background-color: #eee;
`

const Tab = ({ children, active, ...props }) => {
  const [currentActive, setCurrentActive] = useState(() => {
    //active는 초기값 - 설정안해주면 첫번째 값이 currentActive가 됨
    if (active) {
      return active
    } else {
      const index = childrenToArray(children, 'Tab.Item')[0].props.index
      return index
    }
  })
  const items = useMemo(() => {
    return childrenToArray(children, 'Tab.Item').map(element => {
      return React.cloneElement(element, {
        ...element.props,
        key: element.props.index,
        active: element.props.index === currentActive,
        onClick: () => {
          setCurrentActive(element.props.index)
        }
      })
    })
  }, [children, currentActive])

  const activeItem = useMemo(
    () => items.find(element => currentActive === element.props.index),
    [currentActive, items]
  )

  return (
    <div {...props}>
      <TabItemContainer>{items}</TabItemContainer>
      <div>{activeItem.props.children}</div>
    </div>
  )
}

Tab.Item = TabItem

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.string
}

export default Tab
