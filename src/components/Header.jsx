import React from 'react'

const Header = () => {
    return (
        <header style={{
            borderBottom: '1px solid var(--border)',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(12px)',
            position: 'sticky',
            top: 0,
            zIndex: 50
        }}>
            <div className="container" style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: 'var(--primary)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                    </div>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-dark)', letterSpacing: '-0.5px' }}>
                        DocFinder
                    </span>
                </div>

                <nav>
                    <button className="btn" style={{ color: 'var(--text-muted)' }}>Sign In</button>
                    <button className="btn btn-primary" style={{ marginLeft: '1rem' }}>For Doctors</button>
                </nav>
            </div>
        </header>
    )
}

export default Header
