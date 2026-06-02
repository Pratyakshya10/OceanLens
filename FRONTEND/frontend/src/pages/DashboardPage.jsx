export default function DashboardPage() {
  const stats = [
    { icon: '👁', label: 'Observations (7d)', value: '1,284', change: '+12.4%', up: true },
    { icon: '🐟', label: 'Species identified', value: '342',   change: '+8 new',  up: true },
    { icon: '⚠️', label: 'Pollution reports',  value: '47',    change: '-6.1%',   up: false },
    { icon: '💚', label: 'Reef health index',  value: '72.4',  change: '+1.2',    up: true },
  ]

  const regions = [
    { name: 'Coral Triangle', score: 84 },
    { name: 'Caribbean',      score: 61 },
    { name: 'Red Sea',        score: 77 },
    { name: 'Mediterranean',  score: 48 },
    { name: 'South Pacific',  score: 72 },
  ]

  const submissions = [
    { id: 'OL-48201', subject: 'Hawksbill turtle', region: 'Raja Ampat',   time: '2 min ago',  status: 'Verified' },
    { id: 'OL-48200', subject: 'Coral bleaching',  region: 'Great Barrier',time: '11 min ago', status: 'In review' },
    { id: 'OL-48199', subject: 'Plastic debris',   region: 'Bali Strait',  time: '23 min ago', status: 'Verified' },
    { id: 'OL-48198', subject: 'Reef shark',        region: 'Maldives N.',  time: '1 hr ago',   status: 'Verified' },
    { id: 'OL-48197', subject: 'Manta ray',         region: 'Komodo',       time: '2 hr ago',   status: 'Verified' },
    { id: 'OL-48196', subject: 'Crown-of-thorns',  region: 'Palawan',      time: '3 hr ago',   status: 'Flagged' },
  ]

  const statusColor = s =>
    s === 'Verified'  ? 'bg-green-50 text-green-700' :
    s === 'In review' ? 'bg-yellow-50 text-yellow-700' :
    'bg-red-50 text-red-700'

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-1">Insights</p>
          <h1 className="font-serif text-4xl text-ocean-dark">Dashboard</h1>
        </div>
        <div className="flex gap-2">
          {['24h','7d','30d','All'].map((t,i) => (
            <button key={t}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${i===1 ? 'bg-ocean-dark text-white border-ocean-dark' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg">{s.icon}</span>
              <span className={`text-xs font-medium ${s.up ? 'text-green-600' : 'text-red-500'}`}>{s.change}</span>
            </div>
            <p className="font-serif text-3xl text-ocean-dark">{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Chart placeholder */}
        <div className="md:col-span-2 bg-white border border-gray-100 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <p className="font-medium text-ocean-dark">Observations over time</p>
            <span className="text-xs text-gray-400">last 7 days</span>
          </div>
          <div className="h-40 flex items-end gap-2">
            {[40,55,45,70,60,85,90,75,88,95,80,100].map((h,i) => (
              <div key={i} className="flex-1 rounded-t transition-all"
                style={{height:`${h}%`, background: i === 11 ? '#63D2BC' : '#e8f4f8'}}/>
            ))}
          </div>
        </div>

        {/* Reef health */}
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <p className="font-medium text-ocean-dark mb-4">Reef health by region</p>
          <div className="space-y-3">
            {regions.map(r => (
              <div key={r.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{r.name}</span>
                  <span className="text-ocean-dark font-medium">{r.score}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full">
                  <div className="h-full rounded-full bg-ocean-dark" style={{width:`${r.score}%`}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent submissions */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50">
          <p className="font-medium text-ocean-dark">Recent submissions</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-400 border-b border-gray-50">
              {['ID','Subject','Region','Logged','Status'].map(h => (
                <th key={h} className="text-left px-6 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {submissions.map(s => (
              <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-xs text-gray-400 font-mono">{s.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-ocean-dark">{s.subject}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{s.region}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{s.time}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor(s.status)}`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}