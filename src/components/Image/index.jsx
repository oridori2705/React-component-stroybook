import PropTypes from 'prop-types'

const Image = ({ src, width, block, height, alt, mode, ...props }) => {
  const imageStyle = {
    display: block ? 'block' : undefined,
    width,
    height,
    objectFit: mode
  }
  return (
    <img
      src={src}
      style={{ ...props.style, ...imageStyle }}
      alt={alt}
    />
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  block: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  alt: PropTypes.string,
  mode: PropTypes.oneOf(['cover', 'fill', 'contain']),
  style: PropTypes.object
}

export default Image
