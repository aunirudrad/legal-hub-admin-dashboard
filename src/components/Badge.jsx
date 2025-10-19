import React from 'react'

export default function Badge({ children, tone = 'neutral' }) {
    const map = {
        open: 'bg-green-50 text-green-700',
        in_progress: 'bg-yellow-50 text-yellow-700',
        closed: 'bg-gray-100 text-gray-700',
        high: 'bg-red-50 text-red-700',
        medium: 'bg-amber-50 text-amber-700',
        low: 'bg-sky-50 text-sky-700',
        neutral: 'bg-gray-50 text-gray-700'
    }
    const cls = map[tone] || map['neutral']
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>
            {children}
        </span>
    )
}
