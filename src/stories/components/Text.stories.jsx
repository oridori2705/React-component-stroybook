import { Text } from '../../components'

export default {
  title: 'Component/Text',
  component: Text,
  argTypes: {
    size: { control: 'number' },
    strong: { control: 'boolean' },
    underline: { control: 'boolean' },
    delete: { control: 'boolean' },
    color: { control: 'color' },
    block: { control: 'boolean' },
    paragraph: { control: 'boolean' },
    mark: { control: 'boolean' },
    code: { control: 'boolean' }
  }
}

export const Default = args => {
  return (
    <>
      <Text {...args}>Text</Text>
      <Text {...args}>Text</Text>
    </>
  )
}

export const Size = args => {
  return (
    <>
      <Text
        {...args}
        size="large">
        Text
      </Text>
      <Text
        {...args}
        size="normal">
        Text
      </Text>
      <Text
        {...args}
        size="small">
        Text
      </Text>
      <Text
        {...args}
        size={24}>
        Text
      </Text>
    </>
  )
}
