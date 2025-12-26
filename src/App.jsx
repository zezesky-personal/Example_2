import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import CategoryFilter from './components/CategoryFilter'
import DoctorList from './components/DoctorList'
import BookingModal from './components/BookingModal'
import { doctors as initialDoctors } from './data/mockDoctors'

function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [doctors, setDoctors] = useState([])
  const [filteredDoctors, setFilteredDoctors] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(false)

  // Fetch data from API
  const fetchDoctors = async (coords = null, cat = activeCategory, query = searchQuery) => {
    setLoading(true)
    try {
      let url = `http://localhost:3001/api/doctors?category=${cat}`
      if (query) url += `&query=${encodeURIComponent(query)}`
      if (coords) url += `&lat=${coords.lat}&lng=${coords.lng}`

      const res = await fetch(url)
      const data = await res.json()
      setDoctors(data)
      setFilteredDoctors(data)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch and fetch on category change
  useEffect(() => {
    fetchDoctors(location, activeCategory, searchQuery)
  }, [activeCategory, location])

  const handleSearch = (query) => {
    setSearchQuery(query)
    fetchDoctors(location, activeCategory, query)

    const resultsSection = document.getElementById('results')
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser")
      return
    }

    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        setLocation(coords)
        fetchDoctors(coords)
        alert("Location updated! Showing real doctor offices near you.")
      },
      (error) => {
        console.error("Error getting location:", error)
        alert("Unable to retrieve your location. Showing general results.")
        setLoading(false)
      }
    )
  }

  return (
    <div className="app">
      <Header />
      <Hero onSearch={handleSearch} onLocate={handleLocate} />

      <main id="results">
        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={(id) => {
            setActiveCategory(id)
            setSearchQuery('') // Clear search when changing category for better UX
          }}
        />
        <DoctorList doctors={filteredDoctors} onBook={setSelectedDoctor} />
        {loading && <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--primary)' }}>Loading results...</div>}
        {!loading && filteredDoctors.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <p>No health providers found matching your criteria in this area.</p>
          </div>
        )}
      </main>

      <BookingModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
      />

      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        color: 'var(--text-muted)',
        borderTop: '1px solid var(--border)',
        marginTop: 'auto'
      }}>
        <p>&copy; 2025 DocFinder. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
