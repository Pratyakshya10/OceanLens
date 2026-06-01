import MapView from '../components/MapView'

export default function MapPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold text-emerald-400 mb-2">Living ocean map</h1>
      <p className="text-slate-400 text-sm mb-6">
        Every pin is a community observation. The map fills as people submit.
      </p>
      <MapView />
    </div>
  )
}