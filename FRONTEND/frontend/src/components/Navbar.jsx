import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-emerald-400 text-xl font-semibold">🌊 OceanLens</span>
        <span className="text-slate-500 text-sm hidden sm:block">by Pratyakshya</span>
      </div>
      <div className="flex gap-6 text-sm">
        <Link to="/"      className="text-slate-400 hover:text-emerald-400 transition-colors">Submit</Link>
        <Link to="/map"   className="text-slate-400 hover:text-emerald-400 transition-colors">Map</Link>
        <Link to="/story" className="text-slate-400 hover:text-emerald-400 transition-colors">Our Story</Link>
      </div>
    </nav>
  )
}