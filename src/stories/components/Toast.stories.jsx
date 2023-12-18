import { Toast } from '../../components'

export default {
  title: 'Component/Toast'
}

export const Default = () => {
  const toast = new Toast()
  return (
    <button onClick={() => toast.show('안녕하세요!', 3000)}>Show Toast</button>
  )
}
