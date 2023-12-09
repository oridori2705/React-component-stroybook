import Badge from '../components/Badge'
import Image from '../components/Image'

export default {
  title: 'Component/Badge',
  component: Badge,
  argTypes: {
    count: { control: 'number' },
    maxCount: { control: 'number' },
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    showZero: { control: 'boolean' }
  },
  args: {
    count: 10,
    maxCount: 99,
    showZero: false
  }
}

export const Default = args => {
  return (
    <Badge {...args}>
      <Image
        src="http://picsum.photos/60"
        width={60}
        style={{ borderRadius: 8 }}></Image>
    </Badge>
  )
}
export const Dot = args => {
  return (
    <Badge
      {...args}
      dot>
      <Image
        src="http://picsum.photos/60"
        width={60}
        style={{ borderRadius: 8 }}></Image>
    </Badge>
  )
}
