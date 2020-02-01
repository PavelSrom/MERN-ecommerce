import { useState, useEffect } from 'react'

export const useResponsiveDesign = () => {
  const [width, setWidth] = useState(window.innerWidth)
  let spacing
  let headlineSize

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
    })

    return () => {
      window.removeEventListener('resize', null)
    }
  }, [])

  if (width < 600) {
    spacing = 40
    headlineSize = 36
  } else if (width >= 600 && width < 960) {
    spacing = 40
    headlineSize = 36
  } else if (width >= 960 && width < 1280) {
    spacing = 80
    headlineSize = 48
  } else if (width >= 1280 && width < 1920) {
    spacing = 80
    headlineSize = 48
  } else {
    spacing = 80
    headlineSize = 48
  }

  return {
    width,
    spacing,
    headlineSize
  }
}
