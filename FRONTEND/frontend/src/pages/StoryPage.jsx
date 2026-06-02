export default function StoryPage() {
  const timeline = [
    { year: '2023', title: 'The Saraswati moment', desc: 'Pratyakshya watches the Saraswati River in Indore disappear — slowly, visibly — with no one tracking it. The question forms: what if anyone could document this?' },
    { year: '2024', title: 'The gap discovered', desc: 'Research reveals powerful AI marine tools exist — but only for institutions. The Tamil Nadu fisherman who notices the reef looks different has no way to report it.' },
    { year: '2025', title: 'OceanLens is born', desc: 'The platform launches: anyone with a phone can submit an observation. AI interprets it. The community owns the data and tells the story.' },
    { year: '2026', title: 'Community science scales', desc: 'Partnering with TNC and NatGeo to bring OceanLens to coastal communities across India, Indonesia, and the Pacific.' },
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
          OceanLens is the work of a CS student who believes the people closest to the water should have the loudest voice in protecting it.
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="font-semibold text-gray-700 mb-10">A short history</h2>
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
          <p className="text-gray-400 text-sm">— Pratyakshya, CS student, Indore</p>
        </div>
      </div>
    </div>
  )
}