export default function StoryPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold text-emerald-400 mb-6">Why OceanLens exists</h1>
      <div className="space-y-5 text-slate-300 text-sm leading-relaxed">
        <p>There's a river in Indore called the Saraswati. I watched it die — slowly, visibly — and nobody was really tracking it. No one measuring, no one documenting. Just disappearing.</p>
        <p>That pushed me to look at what tools exist for conservation today. I found great AI systems being built for marine monitoring — but almost all of them are built for researchers and institutions.</p>
        <p>The fisherman in coastal Tamil Nadu who notices the reef looks different this season? He has no way to log it, analyze it, or send it somewhere it matters.</p>
        <p className="text-emerald-400 font-medium border-l-2 border-emerald-500 pl-4">
          That's the gap. That's what OceanLens is built on.
        </p>
        <p>Anyone with a phone submits an observation. AI interprets it. The community owns the data and tells the story. No expensive sensors. No scientific training required.</p>
        <p>I started with a dying river in Indore. I want to make sure I'm part of the reason the ocean doesn't follow.</p>
        <p className="text-slate-500 text-xs pt-4 border-t border-slate-800">— Pratyakshya, CS student, Indore</p>
      </div>
    </div>
  )
}