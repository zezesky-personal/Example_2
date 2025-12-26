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
  const [filteredDoctors, setFilteredDoctors] = useState(initialDoctors)
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  // Filter Logic
  useEffect(() => {
    let result = initialDoctors

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(doc => doc.specialty === activeCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase()
      result = result.filter(doc =>
        doc.name.toLowerCase().includes(lowerQuery) ||
        doc.specialty.toLowerCase().includes(lowerQuery) ||
        doc.bio.toLowerCase().includes(lowerQuery) ||
        doc.subtitle.toLowerCase().includes(lowerQuery)
      )
    }

    setFilteredDoctors(result)
  }, [activeCategory, searchQuery])

  const handleSearch = (query) => {
    setSearchQuery(query)
    // Scrolling to results
    const resultsSection = document.getElementById('results')
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLocate = () => {
    // Simulate finding location - for mock we'll just sort by distance (which are already strings like "0.8 miles")
    // Real implementation would use Navigator.geolocation
    alert("Simulating location... showing nearest doctors.")
    const sorted = [...filteredDoctors].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    setFilteredDoctors(sorted)
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
