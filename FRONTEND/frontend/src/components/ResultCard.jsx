export default function ResultCard({ data }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
          <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2"><path d="m2 7 4 4 6-6"/></svg>
        </div>
        <p className="text-green-700 font-medium text-sm">Observation submitted</p>
      </div>
      {data.species && (
        <div className="flex justify-between py-2 border-b border-gray-50">
          <span className="text-sm text-gray-400">Species</span>
          <span className="text-sm text-ocean-dark font-medium">{data.species}</span>
        </div>
      )}
      {data.bleachingLevel !== null && (
        <div className="flex justify-between py-2 border-b border-gray-50">
          <span className="text-sm text-gray-400">Bleaching level</span>
          <span className="text-sm text-ocean-dark font-medium">{data.bleachingLevel} / 4</span>
        </div>
      )}
      <div className="py-2 border-b border-gray-50">
        <span className="text-sm text-gray-400 block mb-1">AI summary</span>
        <span className="text-sm text-ocean-dark">{data.aiSummary}</span>
      </div>
      <p className="text-xs text-gray-400 mt-3">
        Submitted by {data.submitterName} · {new Date(data.createdAt).toLocaleDateString()}
      </p>
    </div>
  )
}