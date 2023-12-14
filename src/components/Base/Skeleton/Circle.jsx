import styled from '@emotion/styled'
import Base from './Base'
import PropTypes from 'prop-types'

const CircularBase = styled(Base)`
  border-radius: 50%;
`

const Circle = ({ size }) => (
  <CircularBase style={{ width: size, height: size }} />
)

Circle.propTypes = {
  size: PropTypes.number
}
export default Circle
