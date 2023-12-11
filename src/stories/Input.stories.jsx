import Input from '../components/Input'

export default {
  title: 'Component/Input',
  component: Input,
  argTypes: {
    label: {
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
    },
    readOnly: {
      control: 'boolean'
    }
  },
  args: {
    label: 'Label',
    block: false,
    invalid: false,
    required: false,
    disabled: false,
    readOnly: false
  }
}

export const Default = args => {
  return <Input {...args} />
}
