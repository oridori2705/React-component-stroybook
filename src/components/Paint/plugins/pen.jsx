import { Plugin } from './plugin'

export class PenPlugin extends Plugin {
  //이전 좌표 값을 만듦으로써 그려지는 것이 자연스러워진다. - moveTo와lineTo가 현재좌표면 점으로 이상하게 그려진다.
  //즉 마우스가 그리기 전 좌표를 저장해놔야 lineTo로 했을 때 자연스럽게 그려진다.
  oldX = -1
  oldY = -1

  constructor(initialValues) {
    //상위 클래스에 이름을 덮어씌운다.
    //즉 pen일때, eraser일때, dash일때 Plugin 클래스가 바뀐다. - Plugin.name이 바뀜
    super({
      ...initialValues,
      name: 'pen'
    })
  }

  draw(data) {
    //Plugin의 draw로 Plugin 클래스 초기화
    super.draw(data)
    //state는 'draw-started', 'drawing', 'draw-finished'과 같은 상태를 받는다.
    const { x, y, state } = data
    const context = this.canvas.getContext('2d') // getContext 메서드를 호출하면 해당 요소에 그래픽을 그릴 수 있는 컨텍스트 객체가 반환됩니다.

    if (this.oldX === -1) this.oldX = x
    if (this.oldY === -1) this.oldY = y

    if (state === 'draw-started' || state === 'drawing') {
      context.beginPath() // 그리기 시작하겠다
      context.moveTo(this.oldX, this.oldY) //어디서부터 라인을 그릴거냐
      context.lineTo(x, y) // 라인을 그리는 것
      context.stroke() //칠할 것이다.
      context.closePath() //안그릴 것이다.

      //onClickDown과 onClickMove마다 oldX와 oldY,x ,y 가 계속해서 바뀐다. 이때 lineTo로 그려지는 것이다.
      this.oldX = x
      this.oldY = y
    } else {
      //그리는 것이 끝났을 때는 초기화
      this.oldX = -1
      this.oldY = -1
    }
  }
}
