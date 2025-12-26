import React, { useState } from 'react'

const Hero = ({ onSearch, onLocate }) => {
    const [query, setQuery] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearch(query)
    }

    return (
        <section style={{
            background: 'linear-gradient(135deg, var(--primary-light) 0%, white 100%)',
            padding: '4rem 0 6rem',
            textAlign: 'center'
        }}>
            <div className="container">
                <h1 style={{
                    fontSize: '3rem',
                    fontWeight: '800',
                    marginBottom: '1rem',
                    color: 'var(--text-main)',
                    letterSpacing: '-1px'
                }}>
                    Find the right care, right now.
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: 'var(--text-muted)',
                    marginBottom: '2.5rem',
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    Book appointments with top-rated doctors near you, for dental, vision, and more.
                </p>

                <div style={{
                    maxWidth: '500px',
                    margin: '0 auto',
                    position: 'relative',
                    display: 'flex',
                    gap: '8px',
                    background: 'white',
                    padding: '8px',
                    borderRadius: '12px',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <form style={{ flex: 1 }} onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Search by condition, doctor, or specialty..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            style={{
                                width: '100%',
                                height: '48px',
                                border: 'none',
                                outline: 'none',
                                padding: '0 1rem',
                                fontSize: '1rem',
                                borderRadius: '8px'
                            }}
                        />
                    </form>
                    <button
                        onClick={onLocate}
                        type="button"
                        className="btn"
                        style={{
                            background: 'var(--primary-light)',
                            color: 'var(--primary-dark)',
                            whiteSpace: 'nowrap'
                        }}
                        title="Use my location"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><line x1="12" x2="12" y1="2" y2="22" />
                        </svg>
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="btn btn-primary"
                        style={{ height: '48px', padding: '0 1.5rem' }}
                    >
                        Search
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Hero
