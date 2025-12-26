import React from 'react'
import DoctorCard from './DoctorCard'

const DoctorList = ({ doctors, onBook }) => {
    if (doctors.length === 0) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h3 style={{ color: 'var(--text-muted)' }}>No specialists found matching your criteria.</h3>
            </div>
        )
    }

    return (
        <div className="container" style={{ paddingBottom: '4rem' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {doctors.map(doctor => (
                    <DoctorCard key={doctor.id} doctor={doctor} onBook={onBook} />
                ))}
            </div>
        </div>
    )
}

export default DoctorList
