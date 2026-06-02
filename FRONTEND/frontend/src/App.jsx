import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import SubmitPage from './pages/SubmitPage'
import DashboardPage from './pages/DashboardPage'
import MapPage from './pages/MapPage'
import StoryPage from './pages/StoryPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"          element={<HomePage />} />
            <Route path="/submit"    element={<SubmitPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/map"       element={<MapPage />} />
            <Route path="/story"     element={<StoryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}