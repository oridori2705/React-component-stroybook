import { Spacer } from '../../components'
import { PropType } from 'prop-types'
export default {
  title: 'Component/Spacer',
  component: Spacer,
  argTypes: {
    size: {
      control: { type: 'range', min: 8, max: 64 }
    }
  },
  args: {
    size: 8
  }
}

const Box = ({ block, style }) => {
  return (
    <div
      style={{
        display: block ? 'block' : 'inline-block',
        width: 100,
        height: 100,
        backgroundColor: 'blue',
        ...style
      }}></div>
  )
}

Box.propTypes = {
  block: PropType.bool,
  style: PropType.object
}

export const Horizontal = args => {
  return (
    <Spacer
      {...args}
      type="horizontal">
      <Box />
      <Box />
      <Box />
    </Spacer>
  )
}
export const Vertical = args => {
  return (
    <Spacer
      {...args}
      type="vertical">
      <Box block />
      <Box block />
      <Box block />
    </Spacer>
  )
}
