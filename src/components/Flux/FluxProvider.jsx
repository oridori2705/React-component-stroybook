import { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

const FluxContext = createContext()
export const useFlux = () => useContext(FluxContext)

const FluxProvider = ({ children, gutter = 0 }) => {
  return (
    <FluxContext.Provider value={{ gutter }}>{children}</FluxContext.Provider>
  )
}

FluxProvider.propTypes = {
  children: PropTypes.node,
  gutter: PropTypes.number
}

export default FluxProvider
