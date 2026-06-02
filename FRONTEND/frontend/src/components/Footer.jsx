import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="font-semibold text-ocean-dark mb-2">OceanLens</p>
          <p className="text-sm text-gray-500 leading-relaxed">
            A citizen-science platform protecting coastal ecosystems through community observation.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">Project</p>
          <div className="flex flex-col gap-2">
            <Link to="/story"     className="text-sm text-gray-500 hover:text-ocean-dark">Our Story</Link>
            <Link to="/map"       className="text-sm text-gray-500 hover:text-ocean-dark">Reef Map</Link>
            <Link to="/dashboard" className="text-sm text-gray-500 hover:text-ocean-dark">Dashboard</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">Contact</p>
          <p className="text-sm text-gray-500">hello@oceanlens.org</p>
          <p className="text-sm text-gray-500">© 2026 OceanLens</p>
        </div>
      </div>
    </footer>
  )
}