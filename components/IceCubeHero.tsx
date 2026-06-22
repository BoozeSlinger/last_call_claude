'use client'

import { useEffect, useRef } from 'react'

function makeEyeTexture(THREE: typeof import('three')) {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const cx = size / 2
  const cy = size / 2

  // Dark background
  ctx.fillStyle = '#080604'
  ctx.fillRect(0, 0, size, size)

  // Outer atmospheric haze
  const hazeGrad = ctx.createRadialGradient(cx, cy, 80, cx, cy, 210)
  hazeGrad.addColorStop(0, 'rgba(184,134,11,0.18)')
  hazeGrad.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = hazeGrad
  ctx.fillRect(0, 0, size, size)

  // Iris rings
  for (const [r, alpha, lw] of [
    [155, 0.9, 2],
    [135, 0.5, 1],
    [115, 0.3, 0.5],
  ] as [number, number, number][]) {
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(184,134,11,${alpha})`
    ctx.lineWidth = lw
    ctx.stroke()
  }

  // Radiating iris lines
  for (let r = 0; r < 32; r++) {
    const angle = (r / 32) * Math.PI * 2
    const brightness = 0.15 + (r % 2) * 0.12
    ctx.beginPath()
    ctx.moveTo(cx + Math.cos(angle) * 78,  cy + Math.sin(angle) * 78)
    ctx.lineTo(cx + Math.cos(angle) * 153, cy + Math.sin(angle) * 153)
    ctx.strokeStyle = `rgba(201,168,76,${brightness})`
    ctx.lineWidth = 0.7
    ctx.stroke()
  }

  // Pupil
  const pupilGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 72)
  pupilGrad.addColorStop(0,   '#000000')
  pupilGrad.addColorStop(0.7, '#06040200')
  ctx.beginPath()
  ctx.arc(cx, cy, 72, 0, Math.PI * 2)
  ctx.fillStyle = pupilGrad
  ctx.fill()

  // Inner gold glint (specular catch-light)
  const glint = ctx.createRadialGradient(cx - 18, cy - 18, 0, cx, cy, 28)
  glint.addColorStop(0,   'rgba(220,180,90,0.55)')
  glint.addColorStop(0.5, 'rgba(184,134,11,0.2)')
  glint.addColorStop(1,   'rgba(184,134,11,0)')
  ctx.beginPath()
  ctx.arc(cx, cy, 28, 0, Math.PI * 2)
  ctx.fillStyle = glint
  ctx.fill()

  return new THREE.CanvasTexture(canvas)
}

export default function IceCubeHero() {
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

      const w = mount.clientWidth  || 500
      const h = mount.clientHeight || 500

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(w, h)
      renderer.setClearColor(0x000000, 0)
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.3
      mount.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100)
      camera.position.z = 3.8

      // ── Lighting — bar ambience ─────────────────────────────────
      // Warm brass key light above-right
      const keyLight = new THREE.PointLight(0xb8860b, 80, 20)
      keyLight.position.set(4, 6, 5)
      scene.add(keyLight)

      // Cool blue-teal fill (neon / bar glow)
      const fillLight = new THREE.DirectionalLight(0x2a5a8c, 1.2)
      fillLight.position.set(-5, -2, 3)
      scene.add(fillLight)

      // Rim/back light
      const rimLight = new THREE.PointLight(0xc9a84c, 30, 15)
      rimLight.position.set(-3, -4, -4)
      scene.add(rimLight)

      // Soft ambient
      scene.add(new THREE.AmbientLight(0x1a120a, 4))

      // ── Materials ───────────────────────────────────────────────
      const eyeTex = makeEyeTexture(THREE)

      const iceMat = new THREE.MeshPhysicalMaterial({
        color: 0x8fc8e8,
        metalness: 0,
        roughness: 0.04,
        transmission: 0.9,
        thickness: 1.4,
        ior: 1.31,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
        envMapIntensity: 1.5,
      })

      const eyeMat = new THREE.MeshPhysicalMaterial({
        map: eyeTex,
        color: 0xffffff,
        metalness: 0,
        roughness: 0.25,
        transmission: 0.4,
        thickness: 0.6,
        ior: 1.31,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
        envMapIntensity: 1,
      })

      // ── Geometry — main cube ─────────────────────────────────────
      const geo = new THREE.BoxGeometry(1.5, 1.5, 1.5, 2, 2, 2)

      // BoxGeometry face order: +x, -x, +y, -y, +z (front), -z (back)
      const faceMats = [
        iceMat.clone(), // right
        iceMat.clone(), // left
        iceMat.clone(), // top
        iceMat.clone(), // bottom
        eyeMat,         // front — the all-seeing eye
        iceMat.clone(), // back
      ]
      const cube = new THREE.Mesh(geo, faceMats)
      scene.add(cube)

      // Brass edge wireframe — ice cube facets
      const edgesGeo = new THREE.EdgesGeometry(geo)
      const edgesMat = new THREE.LineBasicMaterial({
        color: 0xb8860b,
        transparent: true,
        opacity: 0.5,
      })
      cube.add(new THREE.LineSegments(edgesGeo, edgesMat))

      // Inner glow — point light embedded in the cube
      const innerLight = new THREE.PointLight(0x1a6080, 8, 3)
      innerLight.position.set(0, 0, 0)
      cube.add(innerLight)

      // Inner translucent cube for depth layering
      const innerGeo = new THREE.BoxGeometry(0.85, 0.85, 0.85)
      const innerMat = new THREE.MeshPhysicalMaterial({
        color: 0x4a90b8,
        transparent: true,
        opacity: 0.18,
        roughness: 0.1,
        metalness: 0,
        transmission: 0.6,
        thickness: 0.5,
        ior: 1.31,
        side: THREE.BackSide,
      })
      cube.add(new THREE.Mesh(innerGeo, innerMat))

      // ── Entry animation ────────────────────────────────────────
      gsap.set(cube.scale, { x: 0.001, y: 0.001, z: 0.001 })
      gsap.set(cube.rotation, { y: -Math.PI * 0.6 })
      gsap.to(cube.scale,    { x: 1, y: 1, z: 1, duration: 1.4, ease: 'elastic.out(1, 0.45)', delay: 0.3 })
      gsap.to(cube.rotation, { y: 0, duration: 1.6, ease: 'power3.out', delay: 0.3 })

      // ── Interaction state ──────────────────────────────────────
      const mouse = { nx: 0, ny: 0, lx: 0, ly: 0 }
      let scrollProg = 0
      let baseY = 0

      const handleMouse = (e: MouseEvent) => {
        mouse.nx = (e.clientX / window.innerWidth  - 0.5) * 2
        mouse.ny = -(e.clientY / window.innerHeight - 0.5) * 2
      }
      window.addEventListener('mousemove', handleMouse)

      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: '40% top',
        onUpdate: (s) => { scrollProg = s.progress },
      })

      // ── Render loop ─────────────────────────────────────────────
      const tick = () => {
        rafId = requestAnimationFrame(tick)

        // Smooth mouse interpolation
        mouse.lx += (mouse.nx - mouse.lx) * 0.05
        mouse.ly += (mouse.ny - mouse.ly) * 0.05

        // Slow constant drift
        baseY += 0.004

        // Target rotation: base drift + mouse tilt + scroll tilt
        const targetY = baseY + mouse.lx * 0.18
        const targetX = mouse.ly * 0.1 + scrollProg * 0.5

        cube.rotation.y += (targetY - cube.rotation.y) * 0.04
        cube.rotation.x += (targetX - cube.rotation.x) * 0.05

        // Subtle idle float
        cube.position.y = Math.sin(Date.now() * 0.0008) * 0.04

        renderer.render(scene, camera)
      }

      tick()

      const handleResize = () => {
        if (!mount) return
        const nw = mount.clientWidth
        const nh = mount.clientHeight
        if (!nw || !nh) return
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
        edgesGeo.dispose()
        innerGeo.dispose()
        eyeTex.dispose()
        iceMat.dispose()
        eyeMat.dispose()
        innerMat.dispose()
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
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width:  'clamp(280px, 40vw, 520px)',
        height: 'clamp(280px, 40vw, 520px)',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.88,
      }}
    />
  )
}
