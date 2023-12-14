import { Plugin } from './plugin'

export class EraserPlugin extends Plugin {
  oldX = -1
  oldY = -1

  constructor(initialValues) {
    super({
      ...initialValues,
      name: 'eraser'
    })
  }

  draw(data) {
    super.draw(data)

    const { x, y, state } = data
    const context = this.canvas.getContext('2d')

    if (this.oldX === -1) this.oldX = x
    if (this.oldY === -1) this.oldY = y

    context.globalCompositeOperation = 'destination-out' // 그리는 영역이 지워짐

    if (state === 'draw-started' || state === 'drawing') {
      context.beginPath()
      context.moveTo(this.oldX, this.oldY)
      context.lineTo(x, y)
      context.stroke()
      //closePath를 하면 뚝뚝 끊김

      this.oldX = x
      this.oldY = y
    } else {
      this.oldX = -1
      this.oldY = -1
    }
  }
}
