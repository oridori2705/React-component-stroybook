import Slider from '../components/Slider'
import Spacer from '../components/Spacer'
import Icon from '../components/Icon'

export default {
  title: 'Component/Slider',
  component: Slider,
  argTypes: {
    defaultValue: {
      control: 'number'
    },
    min: {
      control: 'number'
    },
    max: {
      control: 'number'
    },
    step: {
      control: 'number'
    },
    onChange: {
      action: 'onChange'
    }
  },
  args: {
    min: 1,
    max: 100,
    defaultValue: 1
  }
}

export const Default = args => {
  return <Slider {...args} />
}

export const VolumeControl = () => {
  return (
    <Spacer>
      <Icon name="volume" />
      <Slider style={{ width: 100, display: 'inline-block' }} />
      <Icon name="volume-2" />
    </Spacer>
  )
}
