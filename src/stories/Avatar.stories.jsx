import Avatar from '../components/Avatar'

export default {
  title: 'Component/Avatar',
  component: Avatar,
  argTypes: {
    src: { control: 'text' },
    shape: {
      control: 'inline-radio',
      options: ['circle', 'round', 'square']
    },
    size: { control: { type: 'range', min: 40, max: 200 } },
    mode: {
      control: 'inline-radio',
      options: ['contain', 'cover', 'fill']
    }
  },
  args: {
    src: 'https://picsum.photos/200',
    shape: 'circle',
    size: 70,
    mode: 'cover'
  }
}

export const Default = args => {
  return <Avatar {...args}></Avatar>
}

export const Group = () => {
  return (
    <Avatar.Group>
      <Avatar src="https://picsum.photos/200?1" />
      <Avatar src="https://picsum.photos/200?2" />
      <Avatar src="https://picsum.photos/200?3" />
      <Avatar src="https://picsum.photos/200?4" />
    </Avatar.Group>
  )
}
