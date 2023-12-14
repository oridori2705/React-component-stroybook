import { Plugin } from './plugin'

export class PenPlugin extends Plugin {
  oldX = -1
  oldY = -1

  constructor(initialValues) {
    super({
      ...initialValues,
      name: 'pen'
    })
  }

  draw(data) {
    super.draw(data)

    const { x, y, state } = data
    const context = this.canvas.getContext('2d')

    if (this.oldX === -1) this.oldX = x
    if (this.oldY === -1) this.oldY = y

    if (state === 'draw-started' || state === 'drawing') {
      context.beginPath()
      context.moveTo(this.oldX, this.oldY)
      context.lineTo(x, y)
      context.stroke()
      context.closePath()

      this.oldX = x
      this.oldY = y
    } else {
      this.oldX = -1
      this.oldY = -1
    }
  }
}
