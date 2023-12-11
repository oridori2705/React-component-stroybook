import Flux from '../components/Flux'

export default {
  title: 'Component/Flux'
}

const Box = () => {
  return (
    <div
      style={{
        backgroundColor: '#44b',
        width: '100%',
        heigth: 30,
        color: 'white',
        textAlign: 'center',
        borderRadius: 8
      }}>
      Box
    </div>
  )
}

export const Default = () => {
  return (
    <Flux.Row gutter={[8, 8]}>
      {Array.from(Array(4), (_, i) => i).map(i => (
        <Flux.Col
          key={i}
          span={2 + i}>
          <Box />
        </Flux.Col>
      ))}
      <Flux.Col span={2}>
        <Box />
      </Flux.Col>
      <Flux.Col
        span={2}
        offset={1}>
        <Box />
      </Flux.Col>
    </Flux.Row>
  )
}
