import { useRef, useEffect } from 'react'

export const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  const tick = () => {
    savedCallback.current()
  }

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
    return () => {}
  }, [delay])
}
