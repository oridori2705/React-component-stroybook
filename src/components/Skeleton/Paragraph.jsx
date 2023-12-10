import Box from './Box'
import PropTypes from 'prop-types'

const Paragraph = ({ line = 3, ...props }) => {
  return (
    <div {...props}>
      {Array.from(Array(line), (_, index) =>
        index !== line - 1 ? (
          <Box
            width="100%"
            height={16}
            key={index}
          />
        ) : (
          <Box
            width="64%"
            height={16}
            key={index}
          />
        )
      )}
    </div>
  )
}
Paragraph.propTypes = {
  line: PropTypes.number.isRequired
}

export default Paragraph
