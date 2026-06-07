import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function StoryPage() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetch(`${API}/api/observations`)
      .then(r => r.json())
      .then(data => {
        const totalObs = data.length
        const uniqueSpecies = new Set(data.map(o => o.species).filter(Boolean)).size
        const uniqueLocations = new Set(data.map(o => `${Math.round(o.lat)},${Math.round(o.lng)}`)).size
        const aiProcessed = data.filter(o => o.aiProcessed).length
        setStats({ totalObs, uniqueSpecies, uniqueLocations, aiProcessed })
      })
      .catch(() => {})
  }, [])

  const timeline = [
    {
      year: '2023',
      title: 'The Saraswati moment',
      desc: 'Watching the Saraswati River in Indore disappear — slowly, visibly — with no systematic documentation. The question forms: what if anyone could document this, and what if the data actually mattered?'
    },
    {
      year: '2024',
      title: 'The gap discovered',
      desc: 'Powerful AI marine tools exist — but only for institutions. The Tamil Nadu fisherman who notices the reef looks different has no way to report it. The Kashmiri wetland watcher has no platform. That gap needed closing.'
    },
    {
      year: '2025',
      title: 'OceanLens is built',
      desc: 'A platform where anyone with a phone can submit an observation. AI interprets it instantly. The community owns the data. Local knowledge becomes global science.'
    },
    {
      year: '2026',
      title: 'Real data, real stakes',
      desc: 'Observations flowing in from Chilika Lake to Lakshadweep reefs. Every submission adds to an open dataset that no institution controls. The mission is accountability — for rivers, coasts, and the people who depend on them.'
    },
  ]

  return (
    <div>
      {/* Hero */}
      <div className="px-6 py-20 text-center" style={{background:'linear-gradient(180deg, #e0f7f3 0%, white 100%)'}}>
        <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">Our Story</p>
        <h1 className="font-serif text-5xl text-ocean-dark mb-6 max-w-2xl mx-auto">
          We started with a dying river.
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
          OceanLens exists because the people closest to the water deserve the tools to protect it — and the world deserves to hear what they find.
        </p>
      </div>

      {/* Live impact stats */}
      <div className="border-y border-gray-100 py-10 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-6 text-center">Live impact</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: stats ? stats.totalObs : '—', label: 'Observations logged' },
              { num: stats ? stats.uniqueLocations : '—', label: 'Locations documented' },
              { num: stats ? stats.uniqueSpecies : '—', label: 'Species identified' },
              { num: stats ? stats.aiProcessed : '—', label: 'AI analyses run' },
            ].map(s => (
              <div key={s.label}>
                <p className="font-serif text-4xl text-ocean-dark">{s.num}</p>
                <p className="text-gray-500 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            These numbers update in real time as the community submits observations.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="font-semibold text-gray-700 mb-10">How we got here</h2>
        <div className="space-y-0">
          {timeline.map((t, i) => (
            <div key={t.year} className={`flex gap-8 pb-10 ${i !== timeline.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <div className="w-16 flex-shrink-0 pt-1">
                <p className="font-semibold text-teal-dark text-sm">{t.year}</p>
              </div>
              <div className="flex-1 pt-1">
                <p className="font-semibold text-ocean-dark mb-2">{t.title}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <div className="border-l-4 pl-8" style={{borderColor:'#63D2BC'}}>
          <p className="font-serif text-2xl text-ocean-dark leading-relaxed mb-4">
            "I started with a dying river in Indore. I want to make sure I'm part of the reason the ocean doesn't follow."
          </p>
          <p className="text-gray-400 text-sm">— The idea behind OceanLens</p>
        </div>
      </div>

      {/* Values */}
      <div className="bg-gray-50 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-8">What we believe</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🌊', title: 'Open data', desc: 'Every observation belongs to the community. No institution owns what the ocean tells us.' },
              { icon: '🤝', title: 'Local knowledge', desc: 'The fisher who has worked the same reef for 30 years knows things no satellite can capture.' },
              { icon: '🔬', title: 'AI as a tool, not a gatekeeper', desc: 'AI interprets observations — it does not decide who gets to make them.' },
            ].map(v => (
              <div key={v.title}>
                <div className="text-2xl mb-3">{v.icon}</div>
                <p className="font-semibold text-ocean-dark mb-2">{v.title}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}