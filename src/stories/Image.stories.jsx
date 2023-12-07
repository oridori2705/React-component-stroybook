import Image from '../components/Image'

export default {
  title: 'Component/Image',
  component: Image,
  argTypes: {
    src: {
      type: { name: 'string', require: true },
      control: 'text'
    },
    block: {
      control: 'boolean'
    },
    width: {
      control: { type: 'range', min: 200, max: 600 }
    },
    height: {
      control: { type: 'range', min: 200, max: 600 }
    },
    alt: {
      control: 'string'
    },
    mode: {
      options: ['cover', 'fill', 'contain'],
      control: 'inline-radio'
    }
  },
  args: {
    src: 'https://picsum.photos/200',
    width: 300,
    height: 300,
    mode: 'cover',
    block: false
  }
}

export const Default = args => {
  return (
    <>
      <Image {...args} />
      <Image {...args} />
    </>
  )
}
