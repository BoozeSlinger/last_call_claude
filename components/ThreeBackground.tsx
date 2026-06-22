'use client'

import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 3000

// Gold/amber palette — matches site CSS vars
const PALETTE_RGB = [
  [0.788, 0.659, 0.298], // #c9a84c
  [0.722, 0.525, 0.071], // #b8860b
  [0.604, 0.439, 0.098], // #9a7019
  [0.42,  0.298, 0.118], // #6b4c1e
  [0.906, 0.784, 0.361], // #e8c85c
]

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId: number
    let cleanupFn: (() => void) | undefined

    async function setup() {
      const THREE = await import('three')
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const mount = mountRef.current
      if (!mount) return

      const w = window.innerWidth
      const h = window.innerHeight

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setSize(w, h)
      renderer.setClearColor(0x000000, 0)
      mount.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000)
      camera.position.z = 5

      // Particle buffers
      const positions = new Float32Array(PARTICLE_COUNT * 3)
      const colors    = new Float32Array(PARTICLE_COUNT * 3)
      const vels: { vx: number; vy: number; phase: number }[] = []

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3
        positions[i3]     = (Math.random() - 0.5) * 24
        positions[i3 + 1] = (Math.random() - 0.5) * 20
        positions[i3 + 2] = (Math.random() - 0.5) * 8

        const col = PALETTE_RGB[Math.floor(Math.random() * PALETTE_RGB.length)]
        colors[i3]     = col[0]
        colors[i3 + 1] = col[1]
        colors[i3 + 2] = col[2]

        const speedY = 0.004 + Math.random() * 0.01 // primarily upward drift
        vels.push({
          vx: (Math.random() - 0.5) * 0.002,
          vy: speedY,
          phase: Math.random() * Math.PI * 2,
        })
      }

      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3))

      const mat = new THREE.PointsMaterial({
        size: 0.055,
        vertexColors: true,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
      })

      scene.add(new THREE.Points(geo, mat))

      // Mouse → world-space repulsion
      const mouse = { wx: -9999, wy: -9999, nx: 0, ny: 0 }
      const handleMouse = (e: MouseEvent) => {
        mouse.nx = (e.clientX / window.innerWidth  - 0.5) * 2
        mouse.ny = -(e.clientY / window.innerHeight - 0.5) * 2
        const fovRad = camera.fov * (Math.PI / 180)
        const halfH  = Math.tan(fovRad / 2) * camera.position.z
        const halfW  = halfH * camera.aspect
        mouse.wx = mouse.nx * halfW
        mouse.wy = mouse.ny * halfH
      }
      window.addEventListener('mousemove', handleMouse)

      // Scroll → camera rushes toward particles
      let scrollProg = 0
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (s) => { scrollProg = s.progress },
      })

      const REPEL    = 2.5
      const REPEL_SQ = REPEL * REPEL
      let frame = 0

      const tick = () => {
        rafId = requestAnimationFrame(tick)
        frame++

        camera.position.z = 5 + scrollProg * 10

        const arr = geo.attributes.position.array as Float32Array

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const i3 = i * 3
          const v  = vels[i]

          // Drift upward with gentle x oscillation
          arr[i3]     += v.vx + Math.sin(frame * 0.006 + v.phase) * 0.0015
          arr[i3 + 1] += v.vy

          // Mouse repulsion — crowd parts for you
          const dx = arr[i3]     - mouse.wx
          const dy = arr[i3 + 1] - mouse.wy
          const d2 = dx * dx + dy * dy
          if (d2 < REPEL_SQ && d2 > 0.001) {
            const d = Math.sqrt(d2)
            const f = ((REPEL - d) / REPEL) * 0.05
            arr[i3]     += (dx / d) * f
            arr[i3 + 1] += (dy / d) * f
          }

          // Wrap edges
          if (arr[i3 + 1] > 11)  arr[i3 + 1] = -10
          if (arr[i3 + 1] < -10) arr[i3 + 1] = 11
          if (arr[i3]     > 13)  arr[i3]     = -12
          if (arr[i3]     < -12) arr[i3]     = 13
        }

        geo.attributes.position.needsUpdate = true
        renderer.render(scene, camera)
      }

      tick()

      const handleResize = () => {
        const nw = window.innerWidth
        const nh = window.innerHeight
        camera.aspect = nw / nh
        camera.updateProjectionMatrix()
        renderer.setSize(nw, nh)
      }
      window.addEventListener('resize', handleResize)

      return () => {
        cancelAnimationFrame(rafId)
        window.removeEventListener('mousemove', handleMouse)
        window.removeEventListener('resize', handleResize)
        geo.dispose()
        mat.dispose()
        renderer.dispose()
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      }
    }

    setup().then(fn => { cleanupFn = fn })
    return () => { cleanupFn?.() }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  )
}
