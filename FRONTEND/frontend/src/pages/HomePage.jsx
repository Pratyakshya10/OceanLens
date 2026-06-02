import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

function FishLoader() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const NUM = 6, R = 110, cx = 160, cy = 160
    const fishes = []
    const speeds = Array.from({length:NUM}, (_,i) => 0.0004 + i * 0.00005)
    const offsets = Array.from({length:NUM}, (_,i) => (i/NUM)*Math.PI*2)

    for (let i = 0; i < NUM; i++) {
      const d = document.createElement('div')
      const color = i % 2 === 0 ? '#63D2BC' : '#1a6a8a'
      d.innerHTML = `<svg viewBox="0 0 36 18" fill="none" width="36" height="18"><ellipse cx="15" cy="9" rx="13" ry="7" fill="${color}"/><polygon points="28,9 36,2 36,16" fill="${color}"/><circle cx="6" cy="7" r="1.5" fill="white"/></svg>`
      d.style.cssText = 'position:absolute;width:36px;height:18px;transform-origin:center'
      el.appendChild(d)
      fishes.push(d)
    }

    let t = 0, raf
    const animate = () => {
      t += 16
      fishes.forEach((f, i) => {
        const a = offsets[i] + t * speeds[i]
        f.style.left = (cx + R * Math.cos(a) - 18) + 'px'
        f.style.top  = (cy + R * Math.sin(a) - 9) + 'px'
        f.style.transform = `rotate(${a * 180 / Math.PI}deg)${Math.cos(a) < 0 ? ' scaleY(-1)' : ''}`
      })
      raf = requestAnimationFrame(animate)
    }
    animate()
    return () => { cancelAnimationFrame(raf); fishes.forEach(f => f.remove()) }
  }, [])

  return (
    <div className="relative w-80 h-80 rounded-full flex items-center justify-center"
      style={{background:'#0a2540'}} ref={canvasRef}>
      <span className="absolute bottom-6 text-xs tracking-widest"
        style={{color:'rgba(99,210,188,0.6)'}}>LIVE REEF PULSE</span>
    </div>
  )
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="px-6 py-20 max-w-6xl mx-auto flex items-center justify-between gap-12">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-xs text-gray-600 mb-8">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
            2,418 OBSERVATIONS THIS MONTH
          </div>
          <h1 className="font-serif text-6xl text-ocean-dark leading-tight mb-6">
            Every wave tells a story.<br/>We're listening.
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-lg">
            OceanLens unites divers, fishers and coastal communities to document reef health in real time. Submit a sighting, watch the data shape policy.
          </p>
          <div className="flex gap-4">
            <Link to="/submit"
              className="bg-ocean-dark text-white px-7 py-3 rounded-full font-medium hover:bg-ocean-mid transition-colors flex items-center gap-2">
              Submit an observation →
            </Link>
            <Link to="/story"
              className="bg-white border border-gray-200 text-ocean-dark px-7 py-3 rounded-full font-medium hover:border-gray-300 transition-colors">
              Our mission
            </Link>
          </div>
        </div>
        <div className="flex-shrink-0">
          <FishLoader />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: '184k', label: 'Observations logged' },
            { num: '62',   label: 'Coastal regions' },
            { num: '1,204',label: 'Species tracked' },
            { num: '38%',  label: 'Reefs improving' },
          ].map(s => (
            <div key={s.label}>
              <p className="font-serif text-4xl text-ocean-dark">{s.num}</p>
              <p className="text-gray-500 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">How it works</p>
        <h2 className="font-serif text-5xl text-ocean-dark mb-16">Three steps from sighting to science.</h2>
        <div className="grid md:grid-cols-3 gap-0 divide-x divide-gray-100">
          {[
            { icon: '📷', title: 'Submit', desc: 'Upload a photo with location. Our AI identifies species in seconds.' },
            { icon: '🔬', title: 'Verify', desc: 'AI analysis grades each submission and adds it to the open dataset.' },
            { icon: '🗺️', title: 'Visualize', desc: 'Watch the global reef map evolve as new observations arrive.' },
          ].map(s => (
            <div key={s.title} className="px-8 py-4 first:pl-0 last:pr-0">
              <div className="text-2xl mb-4">{s.icon}</div>
              <p className="font-semibold text-ocean-dark text-lg mb-2">{s.title}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-6 mb-16 rounded-2xl px-12 py-16 relative overflow-hidden"
        style={{background:'#0a2540'}}>
        <div className="relative z-10">
          <h2 className="font-serif text-4xl text-white mb-6 max-w-lg">
            The ocean covers 71% of the planet. It needs 100% of us.
          </h2>
          <Link to="/submit"
            className="inline-flex items-center gap-2 bg-white text-ocean-dark px-7 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
            Start contributing →
          </Link>
        </div>
        <div className="absolute right-12 bottom-0 opacity-10">
          <svg width="300" height="120" viewBox="0 0 300 120">
            <path d="M0 60 Q50 20 100 60 Q150 100 200 60 Q250 20 300 60" stroke="white" strokeWidth="3" fill="none"/>
            <path d="M0 80 Q50 40 100 80 Q150 120 200 80 Q250 40 300 80" stroke="white" strokeWidth="3" fill="none"/>
          </svg>
        </div>
      </section>
    </div>
  )
}