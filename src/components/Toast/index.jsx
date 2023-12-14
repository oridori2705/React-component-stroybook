import { createRoot } from 'react-dom/client'
import ToastManager from './ToastManager'
import { useEffect } from 'react'

export default function Toast() {
  const portalId = 'toast-portal'
  let portalElement = document.getElementById(portalId)

  if (!portalElement) {
    portalElement = document.createElement('div')
    portalElement.id = portalId
    document.body.appendChild(portalElement)
  }

  //DOM을 추가하기 위한 createPortal
  useEffect(() => {
    const renderToastManager = () => {
      createRoot(portalElement).render(
        <ToastManager
          bind={createToast => {
            this.createToast = createToast
          }}
        />
      )
    }
    renderToastManager()
  }, [portalElement])

  this.show = (message, duration = 2000) => {
    this.createToast(message, duration)
  }
}

/*
    1. Toast를 생성하면 toastid를 만들고, 해당 id값으로된 요소를 찾는다
    2. 없으면 요소 만들어서 거기에 toastid를 붙이고, body에 appned한다.
    3. 그리고 createRoot().render로 ()안의 요소를 넣어줘서 렌더링한다.
    4. 여기까지가 생성하면 동작하는 로직
    5. 만약 toast.show를 실행하면 createToast가 실행되는데 이는 ToastManager에서 갖고온 함수다.
    6. createToast를 실행하면 newtoast 객체를 만들어서 ToastManager의 toasts 상태에 넣어준다.
    7. 그러면 toasts에 데이터가 생겼으므로 toasts.map(({ id, message, duration }) => ( ... ) 이 실행되고 ToastItem컴포넌트가 보이게 된다.
    8. ToastItem에서는 show 상태를 통해 html요소가 보이는데 초기값이 true다. 그래서 toasts데이터가 생성되자마자 보이게 된다.
    9. ToastItem에서는 useTimeout을 이용해서 주어진 duration 이후에 show를 fasle로 만들고, 
    10. setTimeout으로 onDone을 실행시킨다. 
    11. onDone은 ToastManager에서보내준 removeToast함수로 현재 toast 객체를 없애준다.
*/
