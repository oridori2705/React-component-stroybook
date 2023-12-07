import Toggle from '../components/Toggle'

export default {
  title: 'Component/Toggle',
  component: Toggle,
  argTypes: {}
}

export const Default = args => {
  return <Toggle {...args} />
}
