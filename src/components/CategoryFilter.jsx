import React from 'react'
import { categories } from '../data/mockDoctors'

const CategoryFilter = ({ activeCategory, onSelectCategory }) => {
    return (
        <div className="container" style={{ margin: '2rem auto' }}>
            <div style={{
                display: 'flex',
                gap: '0.75rem',
                overflowX: 'auto',
                paddingBottom: '0.5rem',
                scrollbarWidth: 'none'
            }}>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => onSelectCategory(cat.id)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: activeCategory === cat.id ? 'var(--primary)' : 'var(--surface)',
                            color: activeCategory === cat.id ? '#0f172a' : 'var(--text-main)',
                            border: '1px solid',
                            borderColor: activeCategory === cat.id ? 'var(--primary)' : 'var(--border)',
                            whiteSpace: 'nowrap',
                            fontSize: '0.95rem',
                            fontWeight: '500',
                            transition: 'all 0.2s',
                            cursor: 'pointer',
                            boxShadow: activeCategory === cat.id ? 'var(--shadow-md)' : 'none'
                        }}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default CategoryFilter
