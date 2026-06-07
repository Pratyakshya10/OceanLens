import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Convert lat/lng to percentage position on a simple equirectangular world map
const toMapPos = (lat, lng) => ({
  x: ((lng + 180) / 360) * 100,
  y: ((90 - lat) / 180) * 100,
})

const bleachColor = (level) => {
  if (level === null || level === undefined) return '#63D2BC'
  const colors = ['#22c55e', '#eab308', '#f97316', '#ef4444', '#991b1b']
  return colors[level] || '#63D2BC'
}

const bleachLabel = (level) => {
  if (level === null || level === undefined) return 'Unknown'
  const labels = ['Healthy', 'Pale', 'Partial Bleach', 'Mostly Bleached', 'Fully Bleached']
  return labels[level] || 'Unknown'
}

const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function MapPage() {
  const [observations, setObservations] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API}/api/observations`)
      .then(r => r.json())
      .then(data => { setObservations(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs tracking-widest text-cyan-400 uppercase mb-2">Atlas</p>
          <h1 className="text-4xl font-bold text-white">Observation Map</h1>
          <p className="text-gray-400 mt-1 text-sm">{observations.length} real observations from the community</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Map */}
          <div className="md:col-span-2">
            <div
              className="rounded-xl overflow-hidden relative border border-gray-800"
              style={{
                background: 'linear-gradient(180deg, #0a1628 0%, #0d2137 40%, #0a3d52 100%)',
                height: '420px'
              }}
            >
              {/* Grid lines for visual structure */}
              <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                {[20,40,60,80].map(p => (
                  <g key={p}>
                    <line x1={`${p}%`} y1="0" x2={`${p}%`} y2="100%" stroke="#63D2BC" strokeWidth="0.5"/>
                    <line x1="0" y1={`${p}%`} x2="100%" y2={`${p}%`} stroke="#63D2BC" strokeWidth="0.5"/>
                  </g>
                ))}
              </svg>

              {/* Continent outlines (simplified shapes for visual context) */}
              <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                {/* Americas rough shape */}
                <ellipse cx="22%" cy="38%" rx="7%" ry="15%" fill="#1e3a5f"/>
                <ellipse cx="25%" cy="60%" rx="5%" ry="12%" fill="#1e3a5f"/>
                {/* Europe/Africa */}
                <ellipse cx="49%" cy="30%" rx="5%" ry="8%" fill="#1e3a5f"/>
                <ellipse cx="50%" cy="52%" rx="6%" ry="14%" fill="#1e3a5f"/>
                {/* Asia */}
                <ellipse cx="68%" cy="30%" rx="12%" ry="10%" fill="#1e3a5f"/>
                {/* Australia */}
                <ellipse cx="76%" cy="58%" rx="5%" ry="5%" fill="#1e3a5f"/>
              </svg>

              {loading && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                  Loading observations...
                </div>
              )}

              {!loading && observations.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                  No observations yet. Submit one to see it here!
                </div>
              )}

              {/* Observation pins */}
              {observations.map(obs => {
                const pos = toMapPos(obs.lat, obs.lng)
                const isSelected = selected?._id === obs._id
                return (
                  <button
                    key={obs._id}
                    onClick={() => setSelected(obs)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-150 z-10"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    title={obs.species || obs.submitterName}
                  >
                    <div
                      className={`rounded-full ring-2 ring-white transition-all ${isSelected ? 'w-5 h-5' : 'w-3 h-3'}`}
                      style={{ background: bleachColor(obs.bleachingLevel) }}
                    />
                  </button>
                )
              })}

              {/* Map label */}
              <div className="absolute bottom-3 left-3 text-xs text-gray-500">
                {observations.length} pins · Click to explore
              </div>
            </div>

            {/* Legend */}
            <div className="flex gap-4 mt-3 flex-wrap">
              {[['#22c55e','Healthy'],['#eab308','Pale'],['#f97316','Partial'],['#ef4444','Mostly Bleached'],['#63D2BC','Unknown']].map(([c,l]) => (
                <div key={l} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{background:c}}/>
                  <span className="text-xs text-gray-400">{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            {!selected ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-8">
                <div className="text-4xl mb-3">📍</div>
                <p className="text-sm">Click a pin on the map to view observation details</p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{
                      background: bleachColor(selected.bleachingLevel) + '22',
                      color: bleachColor(selected.bleachingLevel)
                    }}
                  >
                    {bleachLabel(selected.bleachingLevel)}
                  </span>
                  <button onClick={() => setSelected(null)} className="text-gray-600 hover:text-gray-400 text-lg">×</button>
                </div>

                <h2 className="text-xl font-bold text-white mb-1">
                  {selected.species || 'Unknown species'}
                </h2>
                <p className="text-xs text-gray-500 mb-4">
                  Submitted by {selected.submitterName || 'Anonymous'} · {timeAgo(selected.createdAt)}
                </p>

                {selected.imageUrl && (
                  <img
                    src={selected.imageUrl.startsWith('http') ? selected.imageUrl : `${API}${selected.imageUrl}`}
                    alt="Observation"
                    className="w-full h-36 object-cover rounded-lg mb-4"
                  />
                )}

                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <p className="text-xs text-cyan-400 uppercase tracking-widest mb-2">AI Summary</p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {selected.aiSummary || 'No AI analysis available'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-800 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Confidence</p>
                    <p className="text-lg font-bold text-white">
                      {selected.confidence != null ? `${Math.round(selected.confidence * 100)}%` : '—'}
                    </p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Location</p>
                    <p className="text-sm font-mono text-white">
                      {Number(selected.lat).toFixed(2)}, {Number(selected.lng).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}