import { useState } from 'react'
import { submitObservation } from '../api'
import ResultCard from '../components/ResultCard'

export default function SubmitPage() {
  const [file, setFile]       = useState(null)
  const [preview, setPreview] = useState(null)
  const [name, setName]       = useState('')
  const [species, setSpecies] = useState('')
  const [notes, setNotes]     = useState('')
  const [depth, setDepth]     = useState('')
  const [date, setDate]       = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState(null)
  const [error, setError]     = useState(null)

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const handleSubmit = async () => {
    if (!file) return
    setLoading(true); setError(null)
    try {
      const pos = await new Promise((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej))
      const fd = new FormData()
      fd.append('image', file)
      fd.append('lat', pos.coords.latitude)
      fd.append('lng', pos.coords.longitude)
      fd.append('submitterName', name || 'Anonymous')
      fd.append('species', species)
      fd.append('notes', notes)
      fd.append('depth', depth)
      const data = await submitObservation(fd)
      setResult(data)
    } catch {
      setError('Submission failed. Make sure the backend is running.')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <p className="text-xs tracking-widest text-gray-400 uppercase mb-2">Contribute</p>
      <h1 className="font-serif text-4xl text-ocean-dark mb-2">Submit an observation</h1>
      <p className="text-gray-500 text-sm mb-10">Photos are reviewed and contributed to the open OceanLens dataset.</p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Left — image drop */}
        <label className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center min-h-72 cursor-pointer hover:border-teal transition-colors">
          <input type="file" accept="image/*" capture="environment" onChange={handleFile} className="hidden"/>
          {preview
            ? <img src={preview} alt="preview" className="w-full h-full object-cover rounded-2xl max-h-80"/>
            : <div className="text-center p-8">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-3">
                  <svg width="24" height="24" fill="none" stroke="#9ca3af" strokeWidth="1.5"><path d="M12 16V8m0 0-3 3m3-3 3 3"/><rect x="3" y="3" width="18" height="18" rx="3"/></svg>
                </div>
                <p className="text-gray-500 text-sm font-medium">Drop a photo or click to browse</p>
                <p className="text-gray-400 text-xs mt-1">JPG, PNG up to 5MB</p>
              </div>
          }
        </label>

        {/* Right — form */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Species or subject</label>
            <input value={species} onChange={e => setSpecies(e.target.value)}
              placeholder="e.g. Yellow tang, plastic debris"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-teal-dark"/>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Your name</label>
            <input value={name} onChange={e => setName(e.target.value)}
              placeholder="Reef name or your name"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-teal-dark"/>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Date observed</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-teal-dark"/>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Depth (m)</label>
            <input type="number" value={depth} onChange={e => setDepth(e.target.value)}
              placeholder="0"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-teal-dark"/>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Notes</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="Conditions, behavior, anything notable..."
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-teal-dark resize-none"/>
          </div>
          <button onClick={handleSubmit} disabled={loading || !file}
            className="w-full bg-ocean-dark disabled:bg-gray-200 disabled:text-gray-400 text-white py-3 rounded-lg font-medium hover:bg-ocean-mid transition-colors text-sm">
            {loading ? 'Submitting...' : 'Submit observation'}
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>
      </div>

      {result && <div className="mt-10"><ResultCard data={result}/></div>}
    </div>
  )
}