import React from 'react'

const DoctorCard = ({ doctor, onBook }) => {
    return (
        <div style={{
            backgroundColor: 'var(--surface)',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)'
        }}
            className="doctor-card"
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
            }}
        >
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                    src={doctor.image}
                    alt={doctor.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 8-8 8s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                    {doctor.distance}
                </div>
            </div>

            <div style={{ padding: '1.5rem' }}>
                <span style={{
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--accent)',
                    fontWeight: '700'
                }}>
                    {doctor.specialty}
                </span>
                <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    margin: '0.25rem 0',
                    color: 'var(--text-main)'
                }}>
                    {doctor.name}
                </h3>
                <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-muted)',
                    marginBottom: '1rem'
                }}>
                    {doctor.subtitle}
                </p>

                <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-muted)',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {doctor.bio}
                </p>

                <button
                    className="btn"
                    style={{
                        width: '100%',
                        backgroundColor: 'var(--primary-light)',
                        color: 'var(--primary-dark)',
                        justifyContent: 'center',
                        fontWeight: '600'
                    }}
                    onClick={(e) => {
                        e.stopPropagation()
                        onBook(doctor)
                    }}
                >
                    Book Appointment
                </button>
            </div>
        </div>
    )
}

export default DoctorCard
