import Progress from '../components/Progress'

export default {
  title: 'Component/Progress',
  component: Progress,
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 }
    }
  },
  args: {
    value: 0
  }
}

export const Default = args => {
  return (
    <div>
      <Progress {...args} />
    </div>
  )
}
