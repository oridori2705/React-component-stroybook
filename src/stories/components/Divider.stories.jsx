import Divider from '../../components/Divider'
import Text from '../../components/Text'
export default {
  title: 'Component/Divider',
  component: Divider,
  argTypes: {
    size: {
      control: 'number'
    },
    type: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical']
    }
  }
}

export const Horizontal = args => {
  return (
    <>
      <Text>위</Text>
      <Divider {...args} />
      <Text>아래</Text>
    </>
  )
}
export const Vertical = args => {
  return (
    <>
      <Text>위</Text>
      <Divider {...args} />
      <Text>아래</Text>
    </>
  )
}
