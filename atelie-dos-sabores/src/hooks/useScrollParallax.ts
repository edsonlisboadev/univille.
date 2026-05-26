import { RefObject, useEffect, useState } from 'react'

interface ParallaxState {
  translateY: number
  rotate: number
}

export function useScrollParallax(
  ref: RefObject<HTMLElement>,
  intensity = 0.12,
): ParallaxState {
  const [state, setState] = useState<ParallaxState>({
    translateY: 0,
    rotate: 0,
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const elementCentreY = rect.top + rect.height / 2
      const viewportCentreY = window.innerHeight / 2
      const distanceFromCentre = elementCentreY - viewportCentreY
      const translateY = distanceFromCentre * intensity
      const rawRotate = distanceFromCentre * 0.005
      const rotate = Math.max(-5, Math.min(5, rawRotate))
      setState({ translateY, rotate })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [ref, intensity])

  return state
}
