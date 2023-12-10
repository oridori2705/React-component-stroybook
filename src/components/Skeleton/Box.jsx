import Base from './Base'
import PropTypes from 'prop-types'

const Box = ({ width, height }) => <Base style={{ width, height }} />

Box.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
}

export default Box
