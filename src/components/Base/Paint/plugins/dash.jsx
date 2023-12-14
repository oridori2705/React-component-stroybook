import { Plugin } from './plugin'

export class DashPlugin extends Plugin {
  oldX = -1
  oldY = -1

  constructor(initialValues) {
    super({
      ...initialValues,
      name: 'dash'
    })
  }

  draw(data) {
    super.draw(data)

    const { x, y, state } = data
    const context = this.canvas.getContext('2d')

    if (this.oldX === -1) this.oldX = x
    if (this.oldY === -1) this.oldY = y

    context.setLineDash([4, 16]) // 대쉬 기능, 4pixel 16pixel은 생략한다.

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
