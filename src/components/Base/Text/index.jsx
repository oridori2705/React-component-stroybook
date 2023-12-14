import './Text.css'
import PropTypes from 'prop-types'

const Text = ({
  children,
  block,
  paragraph,
  size,
  strong,
  underline,
  delete: del,
  color,
  mark,
  code,
  ...props
}) => {
  const Tag = block ? 'div' : paragraph ? 'p' : 'span'

  const fontStyle = {
    fontWeight: strong ? 'bold' : undefined,
    fontSize: typeof size === 'number' ? size : undefined,
    textDecoration: underline ? 'underline' : undefined,
    color
  }

  if (del) {
    children = <del>{children}</del>
  }
  if (mark) {
    children = <mark>{children}</mark>
  }
  if (code) {
    children = <code>{children}</code>
  }

  return (
    <Tag
      className={typeof size === 'string' ? `Text--size-${size}` : undefined}
      style={{ ...props.style, ...fontStyle }}
      {...props}>
      {children}
    </Tag>
  )
}

Text.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  block: PropTypes.bool,
  paragraph: PropTypes.bool,
  delete: PropTypes.bool,
  code: PropTypes.bool,
  underline: PropTypes.bool,
  mark: PropTypes.bool,
  strong: PropTypes.bool,
  color: PropTypes.string,
  style: PropTypes.object,
  props: PropTypes.shape({
    // HTMLAttributes에 포함된 일부 속성을 명시적으로 지정
    className: PropTypes.string,
    id: PropTypes.string,
    onClick: PropTypes.func
    // 필요한 경우 다른 속성 추가
  })
}

export default Text
