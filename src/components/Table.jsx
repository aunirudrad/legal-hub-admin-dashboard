import React from 'react';
import Badge from './Badge';

function mapStatus(s) {
    if (!s) return <Badge tone="neutral">{s}</Badge>;
    if (s === 'open') return <Badge tone="open">Open</Badge>;
    if (s === 'in_progress') return <Badge tone="in_progress">In progress</Badge>;
    if (s === 'closed') return <Badge tone="closed">Closed</Badge>;
    return <Badge tone="neutral">{s}</Badge>
}

function mapPriority(p) {
    if (!p) return <Badge tone="neutral">{p}</Badge>;
    return <Badge tone={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</Badge>
}

export default function Table({ columns = [], data = [] }) {
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow p-3">
            <table className="min-w-full divide-y">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map(c => <th key={c} className="px-4 py-3 text-left text-sm font-medium text-gray-600">{c}</th>)}
                    </tr>
                </thead>

                <tbody className="divide-y">
                    {data.map((row, idx) => (
                        <tr
                            key={idx}
                            className="odd:bg-white even:bg-gray-50 hover:bg-indigo-50/30 transition-colors duration-150"
                        >
                            {columns.map(col => {
                                const key = col;
                                const val = row[col] ?? row[col.toLowerCase()] ?? '';
                                if (col.toLowerCase() === 'status') return <td key={col} className="px-4 py-3">{mapStatus(val)}</td>;
                                if (col.toLowerCase() === 'priority') return <td key={col} className="px-4 py-3">{mapPriority(val)}</td>;
                                return <td key={col} className="px-4 py-3 text-sm text-gray-800">{val}</td>;
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
