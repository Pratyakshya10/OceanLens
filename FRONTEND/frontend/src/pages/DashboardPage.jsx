import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function DashboardPage() {
  const [observations, setObservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API}/api/observations`)
      .then(r => r.json())
      .then(data => { setObservations(data); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [])

  const totalObs = observations.length
  const uniqueSpecies = new Set(observations.map(o => o.species).filter(Boolean)).size
  const aiProcessed = observations.filter(o => o.aiProcessed).length
  const recentObs = observations.slice(0, 6)

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  const bleachLabel = (level) => {
    if (level === null || level === undefined) return null
    const labels = ['Healthy', 'Pale', 'Partial', 'Mostly', 'Fully bleached']
    return labels[level] || null
  }

  const bleachColor = (level) => {
    if (level === null || level === undefined) return 'bg-gray-800 text-gray-300'
    const colors = [
      'bg-emerald-900 text-emerald-300',
      'bg-yellow-900 text-yellow-300',
      'bg-orange-900 text-orange-300',
      'bg-red-900 text-red-400',
      'bg-red-950 text-red-400',
    ]
    return colors[level] || 'bg-gray-800 text-gray-300'
  }

  const stats = [
    { icon: '🌊', label: 'Total Observations', value: totalObs },
    { icon: '🐟', label: 'Species Identified', value: uniqueSpecies },
    { icon: '🤖', label: 'AI Analyzed', value: aiProcessed },
    { icon: '📍', label: 'Active Locations', value: new Set(observations.map(o => `${Math.round(o.lat)},${Math.round(o.lng)}`)).size },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs tracking-widest text-cyan-400 uppercase mb-2">Live Data</p>
          <h1 className="text-4xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1 text-sm">Real-time marine observation insights</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map(s => (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="text-2xl mb-3">{s.icon}</div>
              <p className="text-3xl font-bold text-white">{loading ? '—' : s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Recent submissions */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
            <p className="font-semibold text-white">Recent Submissions</p>
            <span className="text-xs text-gray-500">{totalObs} total</span>
          </div>

          {loading && (
            <div className="px-6 py-12 text-center text-gray-500">Loading observations...</div>
          )}

          {error && (
            <div className="px-6 py-12 text-center text-red-400">Failed to load: {error}</div>
          )}

          {!loading && !error && observations.length === 0 && (
            <div className="px-6 py-12 text-center text-gray-500">
              No observations yet. <a href="/submit" className="text-cyan-400 hover:underline">Submit the first one!</a>
            </div>
          )}

          {!loading && !error && observations.length > 0 && (
            <table className="w-full">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-800">
                  {['Submitter', 'Species', 'AI Summary', 'Bleaching', 'Confidence', 'Time'].map(h => (
                    <th key={h} className="text-left px-6 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentObs.map(obs => (
                  <tr key={obs._id} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {obs.submitterName || 'Anonymous'}
                    </td>
                    <td className="px-6 py-4 text-sm text-cyan-300">
                      {obs.species || <span className="text-gray-600">—</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400 max-w-xs">
                      <span className="line-clamp-2">{obs.aiSummary || '—'}</span>
                    </td>
                    <td className="px-6 py-4">
                      {bleachLabel(obs.bleachingLevel) ? (
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${bleachColor(obs.bleachingLevel)}`}>
                          {bleachLabel(obs.bleachingLevel)}
                        </span>
                      ) : <span className="text-gray-600 text-xs">—</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {obs.confidence != null ? `${Math.round(obs.confidence * 100)}%` : '—'}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {timeAgo(obs.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  )
}