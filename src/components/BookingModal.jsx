import React, { useState } from 'react'

const BookingModal = ({ doctor, onClose }) => {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    if (!doctor) return null

    const handleAddToCalendar = () => {
        if (!date || !time) {
            alert('Please select a date and time')
            return
        }

        // Parse date and time to create start/end strings
        // Format: YYYYMMDDTHHMMSS
        const startDateTime = new Date(`${date}T${time}`)
        const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000) // 1 hour duration

        const formatTime = (d) => {
            return d.toISOString().replace(/-|:|\.\d\d\d/g, "")
        }

        const start = formatTime(startDateTime)
        const end = formatTime(endDateTime)

        const title = encodeURIComponent(`Appointment with ${doctor.name}`)
        const details = encodeURIComponent(`Specialty: ${doctor.specialty}\nBio: ${doctor.bio}`)
        const location = encodeURIComponent(`${doctor.distance} away`)

        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`

        window.open(googleCalendarUrl, '_blank')
        onClose()
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                width: '90%',
                maxWidth: '500px',
                boxShadow: 'var(--shadow-lg)'
            }} onClick={e => e.stopPropagation()}>
                <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Book with {doctor.name}</h2>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border)',
                            fontFamily: 'inherit'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Time</label>
                    <select
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border)',
                            fontFamily: 'inherit',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="">Select a time</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                    </select>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button
                        onClick={onClose}
                        className="btn"
                        style={{ backgroundColor: 'var(--border)', color: 'var(--text-main)' }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddToCalendar}
                        className="btn btn-primary"
                        disabled={!date || !time}
                        style={{ opacity: (!date || !time) ? 0.7 : 1 }}
                    >
                        Add to Google Calendar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookingModal
