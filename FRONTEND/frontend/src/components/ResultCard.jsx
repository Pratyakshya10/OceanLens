export default function ResultCard({ data }) {
  return (
    <div className="mt-6 bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-3">
      <p className="text-emerald-400 font-semibold text-sm">✅ Observation submitted</p>
      {data.species && (
        <p className="text-slate-300 text-sm">
          <span className="text-slate-500">Species: </span>{data.species}
        </p>
      )}
      {data.bleachingLevel !== null && (
        <p className="text-slate-300 text-sm">
          <span className="text-slate-500">Bleaching level: </span>{data.bleachingLevel} / 4
        </p>
      )}
      <p className="text-slate-300 text-sm">
        <span className="text-slate-500">AI summary: </span>{data.aiSummary}
      </p>
      <p className="text-slate-500 text-xs">
        Submitted by {data.submitterName} · {new Date(data.createdAt).toLocaleDateString()}
      </p>
    </div>
  )
}