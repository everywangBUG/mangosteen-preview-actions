import { type RefObject, useEffect, useRef, useState } from 'react'

interface Config {
  onTouchStart?: (e: TouchEvent) => void
  onTouchMove?: (e: TouchEvent) => void
  onTouchEnd?: (e: TouchEvent) => void
}

export function useWipe(elementRef: RefObject<HTMLElement>, config?: Config) {
  const [direction, setDirection] = useState<'' | 'left' | 'right'>('')
  const x = useRef(-1)
  const onTouchStart = (e: TouchEvent) => {
    config?.onTouchStart?.(e)
    x.current = e.touches[0].clientX
  }
  const onTouchMove = (e: TouchEvent) => {
    config?.onTouchMove?.(e)
    const newx = e.touches[0].clientX
    const d = x.current - newx
    if (Math.abs(d) > 5) {
      setDirection('left')
    }
    else if (d < 3) {
      setDirection('')
    }
    else {
      setDirection('right')
    }
  }
  const onTouchEnd = (e: TouchEvent) => {
    config?.onTouchEnd?.(e)
    setDirection('')
  }
  useEffect(() => {
    if (!elementRef.current) { return }
    elementRef.current.addEventListener('touchstart', onTouchStart)
    elementRef.current.addEventListener('touchmove', onTouchMove)
    elementRef.current.addEventListener('touchend', onTouchEnd)

    return () => {
      if (!elementRef.current) { return }
      elementRef.current.addEventListener('touchstart', onTouchStart)
      elementRef.current.addEventListener('touchmove', onTouchMove)
      elementRef.current.addEventListener('touchend', onTouchEnd)
    }
  }, [])

  return { direction }
}
