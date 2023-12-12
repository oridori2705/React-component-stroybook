import useLocalStorage from '../../hooks/useLocalStorage'

export default {
  title: 'Hook/useLocalStorage'
}

export const Default = () => {
  const [status, setStatus] = useLocalStorage('status', '404 NOT FOUND')
  console.log('렌더링!')
  return (
    <div>
      <button onClick={() => setStatus('200 OK')}>Resend</button>
      {status}
    </div>
  )
}
