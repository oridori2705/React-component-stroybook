import Spinner from '../components/Spinner'

export default {
  title: 'Component/Spinner',
  component: Spinner,
  argTypes: {
    size: {
      type: { name: 'number' },
      control: 'number'
    },
    color1: {
      control: 'color'
    },
    color2: {
      control: 'color'
    },
    loading: {
      control: 'boolean'
    }
  },
  args: {
    size: 24,
    loading: true
  }
}

export const Default = args => {
  return <Spinner {...args} />
}
