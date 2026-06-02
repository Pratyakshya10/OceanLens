import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/',          label: 'Home' },
  { to: '/submit',    label: 'Submit' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/map',       label: 'Map' },
  { to: '/story',     label: 'Our Story' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-ocean-dark flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 10 Q5 6 8 10 Q11 14 14 10" stroke="#63D2BC" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M2 7 Q5 3 8 7 Q11 11 14 7" stroke="#63D2BC" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity=".5"/>
          </svg>
        </div>
        <span className="font-semibold text-ocean-dark text-lg">OceanLens</span>
      </Link>

      <div className="flex items-center gap-1">
        {links.map(l => (
          <Link key={l.to} to={l.to}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              pathname === l.to
                ? 'bg-gray-100 text-ocean-dark font-medium'
                : 'text-gray-500 hover:text-ocean-dark'
            }`}>
            {l.label}
          </Link>
        ))}
      </div>

      <Link to="/submit"
        className="bg-ocean-dark text-white text-sm px-5 py-2 rounded-full hover:bg-ocean-mid transition-colors font-medium">
        Contribute
      </Link>
    </nav>
  )
}