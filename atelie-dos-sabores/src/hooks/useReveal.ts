import { RefObject, useEffect, useState } from 'react'

export function useReveal(ref: RefObject<HTMLElement>): boolean {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [ref])

  return isVisible
}
