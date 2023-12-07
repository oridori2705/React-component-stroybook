import { useCallback, useState } from 'react'

const useToggle = (init = false) => {
  const [state, setState] = useState(init)
  const toggle = useCallback(() => setState(state => !state), [])

  return [state, toggle]
}

export default useToggle
