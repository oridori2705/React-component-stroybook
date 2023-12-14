import React from 'react'
import styled from '@emotion/styled'
import BreadcrumbItem from './BreadcrumbItem'
import PropTypes from 'prop-types'

const BreadcrumbContainer = styled.nav`
  display: inline-block;
`

const Breadcrumb = ({ children, ...props }) => {
  //children 요소를 가공
  const items = React.Children.toArray(children)
    .filter(element => {
      if (
        React.isValidElement(element) &&
        element.props.__TYPE === 'Breadcrumb.Item'
      ) {
        return true
      }

      console.warn("Only accepts Breadcrumb.Item as it's children.")
      return false
    })
    .map((element, index, elements) => {
      return React.cloneElement(element, {
        ...element.props,
        active: index === elements.length - 1
      })
    })

  return <BreadcrumbContainer {...props}>{items}</BreadcrumbContainer>
}

Breadcrumb.Item = BreadcrumbItem

Breadcrumb.propTypes = {
  children: PropTypes.node.isRequired
}

export default Breadcrumb
