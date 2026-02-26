'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 400, damping: 40 })
  const springY = useSpring(y, { stiffness: 400, damping: 40 })

  const [expanded, setExpanded] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const cursorTarget = target.closest('[data-cursor="expand"]')
      setExpanded(!!cursorTarget)
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [x, y, visible])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-9999 mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      {/* Crosshair cursor */}
      <motion.div
        className="relative flex items-center justify-center"
        animate={{
          width: expanded ? 40 : 14,
          height: expanded ? 40 : 14,
          backgroundColor: expanded ? 'rgba(184, 150, 62, 0.3)' : 'transparent',
          borderColor: expanded ? '#B8963E' : '#06402B',
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          borderRadius: '50%',
          borderWidth: expanded ? 1 : 0,
          opacity: visible ? 1 : 0,
        }}
      >
        {!expanded && (
          <>
            {/* Vertical line */}
            <span
              className="absolute h-3.5 w-px bg-green"
              style={{ left: '50%', transform: 'translateX(-50%)' }}
            />
            {/* Horizontal line */}
            <span
              className="absolute h-px w-3.5 bg-green"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            />
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
