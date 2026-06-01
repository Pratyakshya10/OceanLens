import { useState } from 'react'
import { submitObservation } from '../api'
import ResultCard from '../components/ResultCard'

export default function SubmitPage() {
  const [file, setFile]       = useState(null)
  const [name, setName]       = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState(null)
  const [preview, setPreview] = useState(null)
  const [error, setError]     = useState(null)

  const handleFile = (e) => {
    const f = e.target.files[0]
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const handleSubmit = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      const pos = await new Promise((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej))
      const fd = new FormData()
      fd.append('image', file)
      fd.append('lat', pos.coords.latitude)
      fd.append('lng', pos.coords.longitude)
      fd.append('submitterName', name || 'Anonymous')
      const data = await submitObservation(fd)
      setResult(data)
    } catch (err) {
      setError('Submission failed. Make sure the backend is running.')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-lg mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold text-emerald-400 mb-2">Submit an observation</h1>
      <p className="text-slate-400 text-sm mb-8">
        Take a photo of any water body — reef, river, coast. Your data matters.
      </p>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />

        <label className="block w-full border-2 border-dashed border-slate-700 rounded-xl p-6 text-center cursor-pointer hover:border-emerald-500 transition-colors">
          <input type="file" accept="image/*" capture="environment" onChange={handleFile} className="hidden" />
          {preview
            ? <img src={preview} alt="preview" className="mx-auto max-h-48 rounded-lg object-cover" />
            : <div>
                <p className="text-slate-400 text-sm">Tap to take photo or upload</p>
                <p className="text-slate-600 text-xs mt-1">Max 5MB</p>
              </div>
          }
        </label>

        <button
          onClick={handleSubmit}
          disabled={loading || !file}
          className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 font-semibold py-3 rounded-lg transition-colors text-sm"
        >
          {loading ? 'Submitting...' : 'Submit observation'}
        </button>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      </div>

      {result && <ResultCard data={result} />}
    </div>
  )
}