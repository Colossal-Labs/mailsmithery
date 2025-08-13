import * as React from "react"

// Enhanced breakpoint system for comprehensive responsive design
export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export type Breakpoint = keyof typeof BREAKPOINTS
export type DeviceType = 'mobile' | 'tablet' | 'desktop'

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.md - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.md)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < BREAKPOINTS.md)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = React.useState<DeviceType>('desktop')

  React.useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth
      if (width < BREAKPOINTS.md) {
        setDeviceType('mobile')
      } else if (width < BREAKPOINTS.lg) {
        setDeviceType('tablet')
      } else {
        setDeviceType('desktop')
      }
    }

    const mql = window.matchMedia('(max-width: 1023px)')
    mql.addEventListener('change', updateDeviceType)
    updateDeviceType()
    
    return () => mql.removeEventListener('change', updateDeviceType)
  }, [])

  return deviceType
}

export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const [matches, setMatches] = React.useState<boolean>(false)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${BREAKPOINTS[breakpoint]}px)`)
    const onChange = () => setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    setMatches(mql.matches)
    return () => mql.removeEventListener('change', onChange)
  }, [breakpoint])

  return matches
}

export function useViewportSize() {
  const [size, setSize] = React.useState<{ width: number; height: number }>(
    () => ({
      width: typeof window !== 'undefined' ? window.innerWidth : 0,
      height: typeof window !== 'undefined' ? window.innerHeight : 0,
    })
  )

  React.useEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', updateSize)
    updateSize()
    
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return size
}