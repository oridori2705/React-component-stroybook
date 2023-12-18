import { Select } from '../../components'

export default {
  title: 'Component/Select',
  component: Select,
  argTypes: {
    label: {
      control: 'text'
    },
    placeholder: {
      control: 'text'
    },
    block: {
      control: 'boolean'
    },
    invalid: {
      control: 'boolean'
    },
    required: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    }
  },
  args: {
    label: 'Label',
    block: false,
    invalid: false,
    required: false,
    disabled: false,
    placeholder: 'Placeholder'
  }
}

export const Default = args => {
  return (
    <Select
      data={['Item 1', 'Item 2', { label: 'Item 3', value: 'value' }]}
      {...args}
    />
  )
}
