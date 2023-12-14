import { useCallback, useEffect, useRef, useState } from 'react'
import { PenPlugin } from './plugins/pen'

//캔버스의 위치가 어디에 있는지 먼저 추적해야한다.(스크롤하다가 중간에 있는 경우)
const calculateCoord = (e, canvas) => {
  const rect = canvas.getBoundingClientRect() // canvas의 크기와 현재 좌표를 받음

  return {
    x: e.pageX - rect.left - window.scrollX,
    y: e.pageY - rect.top - window.scrollY
  }
}

const Paint = ({
  command = 'pen', // 브러쉬 타입
  color = '#000000', //브러쉬 색상
  lineWidth = 2, // 브러쉬 굵기
  width = 800, // 캔버스 크기
  height = 600,
  plugins = [new PenPlugin()], // 플러그인에대한 처리(기본값은 PenPlugin)
  style, //커스텀 가능하도록 style과 className
  className
}) => {
  const [currentCommand, setCurrentCommand] = useState(command)
  const [currentLineWidth, setCurrentLineWidth] = useState(lineWidth)
  const [currentColor, setCurrentColor] = useState(color)
  const [currentPlugins, setCurrentPlugins] = useState({}) //현재 플로그인을 객체로 초기화한다(name을 통해서 객체로 저장하기 위해)
  const [drawing, setDrawing] = useState(false)
  const canvasRef = useRef() //cavas로부터 context를 받아야 함

  //요즘 모니터의 해상도가 높은 경우가 많아서 레티나와 같은 시스템을 지원하기위해
  //캔버스의 크기에서 scale을 정해서 곱해줘야한다.
  const scale = typeof window === 'undefined' ? 1 : window.devicePixelRatio // 1pixel을 표현하기위해서 어느정도의 ratio을 잡아야하는지 제공해준다.

  const canvasDefaultStyle = {
    userSelect: 'none', // 캔버스에서 그리는 행위를 할 것이므로 드래그 동작을 없애준다.
    WebkitUserSelect: 'none'
  }

  //밑에서 scale로 width크기를 크게해주면 캔버스 자체도 커지기때문에
  //캔버스를 보여줄 때의 크기를 고정시키기위해 설정
  const canvasSizeStyle = {
    width,
    height
  }

  //App.jsx에서 도구,색상,굵기가 바뀌면 값을 갱신해줘야한다.
  useEffect(() => {
    setCurrentLineWidth(lineWidth)
  }, [lineWidth])

  useEffect(() => {
    setCurrentCommand(command)
  }, [command])

  useEffect(() => {
    setCurrentColor(color)
  }, [color])

  //plugins를 따로둬야 그리기 전의 기록이 남는다.(canvasRef.current.width = width * scale과 같이 너비나 높이가 설정되면 캔버스가 초기화된다.) -> 이걸해결하려면 복잡해짐
  useEffect(() => {
    //plugin들이 각각 canvas를 가지게함 - props ={[new PenPlugin(), new EraserPlugin(), new DashPlugin()]}
    plugins.forEach(plugin => {
      plugin.canvas = canvasRef.current
    })

    setCurrentPlugins(
      //사용시 name을 통해서 간편하게 사용할 수 있도록 정제함
      Object.assign(
        {},
        ...plugins.map(plugin => ({
          [plugin.name]: plugin
        }))
      )
    )
  }, [plugins])

  useEffect(() => {
    if (!canvasRef.current) return

    // 캔버스의 너비와 높이 지정
    canvasRef.current.width = width * scale
    canvasRef.current.height = height * scale

    canvasRef.current.getContext('2d').scale(scale, scale) // getContext 메서드를 호출하면 해당 요소에 그래픽을 그릴 수 있는 컨텍스트 객체가 반환됩니다.
  }, [scale, width, height]) // useRef로 만든 변수는 의존성 배열에 추가하지 않는 것이 좋다.

  // 드로잉 마우스 이벤트 (Down, Move, Up)
  const handleDrawStart = useCallback(
    e => {
      e.preventDefault()

      //x와y는 상대적인 값 (0,0)으로 됨
      const { x, y } = calculateCoord(e, canvasRef.current)
      currentPlugins[currentCommand].draw({
        x,
        y,
        width,
        height,
        scale,
        lineWidth: currentLineWidth,
        color: currentColor,
        state: 'draw-started'
      })

      setDrawing(true)
    },
    [
      currentCommand,
      currentColor,
      currentLineWidth,
      currentPlugins,
      width,
      height,
      scale
    ]
  ) // 의존성 처리가 중요하다. ( 여기서 plugins를 넣어버리면 플러그인이 바뀔 때 이전에 그린 기록이 없어진다.)
  const handleDrawing = useCallback(
    e => {
      e.preventDefault()
      if (!drawing) return

      const { x, y } = calculateCoord(e, canvasRef.current)

      currentPlugins[currentCommand].draw({
        x,
        y,
        width,
        height,
        scale,
        lineWidth: currentLineWidth,
        color: currentColor,
        state: 'drawing'
      })
    },
    [
      canvasRef,
      currentCommand,
      currentColor,
      currentLineWidth,
      currentPlugins,
      drawing,
      width,
      height,
      scale
    ]
  )
  const handleDrawFinish = useCallback(
    e => {
      e.preventDefault()
      if (!drawing) return

      const { x, y } = calculateCoord(e, canvasRef.current)

      currentPlugins[currentCommand].draw({
        x,
        y,
        width,
        height,
        scale,
        lineWidth: currentLineWidth,
        color: currentColor,
        state: 'draw-finished'
      })

      setDrawing(false)
    },
    [
      canvasRef,
      currentCommand,
      currentColor,
      currentLineWidth,
      currentPlugins,
      drawing,
      width,
      height,
      scale
    ]
  )

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleDrawStart}
      onMouseMove={handleDrawing}
      onMouseUp={handleDrawFinish}
      style={{ ...canvasDefaultStyle, ...canvasSizeStyle, ...style }}
      className={className}
    />
  )
}

export default Paint
