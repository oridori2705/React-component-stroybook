import { Image } from '../../components'

export default {
  title: 'Component/Image',
  component: Image,
  argTypes: {
    lazy: {
      control: { type: 'boolean' }
    },
    placeholder: {
      type: { require: true },
      control: 'text'
    },
    threshold: {
      type: { name: 'number' },
      control: 'number'
    },
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
    placeholder: 'https://via.placeholder.com/200',
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

export const Lazy = args => {
  return (
    <div>
      {Array.from(new Array(20), (_, k) => k).map(i => (
        <Image
          {...args}
          lazy
          block
          key={i}
          src={`${args.src}?${i}`}
        />
      ))}
    </div>
  )
}
