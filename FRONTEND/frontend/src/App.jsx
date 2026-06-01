import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import SubmitPage from './pages/SubmitPage'
import MapPage from './pages/MapPage'
import StoryPage from './pages/StoryPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <Routes>
          <Route path="/"      element={<SubmitPage />} />
          <Route path="/map"   element={<MapPage />} />
          <Route path="/story" element={<StoryPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}