import { useState } from 'react'

const regions = [
  { id: 1, name: 'Coral Triangle', status: 'Healthy',  obs: 1284, species: 160, divers: 53,  reports: 107, x: 65, y: 45, color: '#63D2BC' },
  { id: 2, name: 'Caribbean',      status: 'Warning',  obs: 892,  species: 98,  divers: 31,  reports: 64,  x: 22, y: 38, color: '#f59e0b' },
  { id: 3, name: 'Red Sea',        status: 'Healthy',  obs: 543,  species: 72,  divers: 18,  reports: 29,  x: 50, y: 32, color: '#63D2BC' },
  { id: 4, name: 'Mediterranean',  status: 'Critical', obs: 311,  species: 44,  divers: 12,  reports: 88,  x: 48, y: 25, color: '#ef4444' },
  { id: 5, name: 'South Pacific',  status: 'Healthy',  obs: 721,  species: 134, divers: 29,  reports: 41,  x: 78, y: 58, color: '#63D2BC' },
]

export default function MapPage() {
  const [selected, setSelected] = useState(regions[0])

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <p className="text-xs tracking-widest text-gray-400 uppercase mb-2">Atlas</p>
      <h1 className="font-serif text-4xl text-ocean-dark mb-6">Reef map</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 flex items-center gap-2">
              <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.5"><circle cx="7" cy="7" r="5"/><path d="m13 13-3-3"/></svg>
              <input placeholder="Search a reef or region..." className="text-sm outline-none w-full bg-transparent text-gray-600"/>
            </div>
            <button className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-500 flex items-center gap-2 hover:border-gray-300">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="5" height="5"/><rect x="9" y="2" width="5" height="5"/><rect x="2" y="9" width="5" height="5"/><rect x="9" y="9" width="5" height="5"/></svg>
              Layers
            </button>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden relative" style={{background:'linear-gradient(180deg, #a8d8ea 0%, #7ec8e3 100%)', height:'380px'}}>
            {regions.map(r => (
              <button key={r.id}
                onClick={() => setSelected(r)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125"
                style={{left:`${r.x}%`, top:`${r.y}%`}}>
                <div className="w-3 h-3 rounded-full ring-2 ring-white"
                  style={{background: r.color}}/>
              </button>
            ))}
            {/* Fake reef shapes */}
            {[[15,30,80,60],[30,25,100,70],[55,40,90,65],[68,30,75,55],[80,50,70,50]].map(([x,y,w,h],i)=>(
              <div key={i} className="absolute rounded-lg opacity-30"
                style={{left:`${x}%`,top:`${y}%`,width:`${w}px`,height:`${h}px`,background:'#b0d4e8',transform:'rotate(-10deg)'}}/>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-1">
            <svg width="16" height="16" fill="none" stroke="#63D2BC" strokeWidth="1.5"><path d="M12 21s-7-6.5-7-11a7 7 0 1 1 14 0c0 4.5-7 11-7 11z"/></svg>
            <span className="text-xs text-gray-400">{selected.status}</span>
          </div>
          <h2 className="font-serif text-2xl text-ocean-dark mb-4">{selected.name}</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { v: selected.obs.toLocaleString(), l: 'Observations' },
              { v: selected.species, l: 'Species' },
              { v: selected.divers, l: 'Active divers' },
              { v: selected.reports, l: 'Reports (30d)' },
            ].map(s => (
              <div key={s.l}>
                <p className="font-serif text-2xl text-ocean-dark">{s.v}</p>
                <p className="text-xs text-gray-400">{s.l}</p>
              </div>
            ))}
          </div>

          <button className="w-full bg-ocean-dark text-white py-2.5 rounded-lg text-sm font-medium hover:bg-ocean-mid transition-colors mb-6">
            View region report
          </button>

          <div>
            <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">Legend</p>
            {[['#63D2BC','Healthy'],['#f59e0b','Warning'],['#ef4444','Critical']].map(([c,l]) => (
              <div key={l} className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{background:c}}/>
                <span className="text-sm text-gray-600">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}