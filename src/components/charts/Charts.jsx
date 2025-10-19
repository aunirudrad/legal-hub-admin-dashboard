import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend,
    BarChart, Bar, CartesianGrid
} from 'recharts';

// color palette (keeps theme consistent)
const COLORS = ['#60a5fa', '#3b82f6', '#2563eb', '#f97316', '#ef4444', '#10b981'];

export function CasesAreaChart({ data }) {
    // data: [{ month, cases }, ...]
    return (
        <div className="bg-white p-4 rounded-2xl shadow transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">Cases Trend (12 mo)</h4>
                <div className="text-xs text-gray-500">Monthly</div>
            </div>

            <div style={{ width: '100%', height: 530 }}>
                <ResponsiveContainer>
                    <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.35} />
                                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="cases" stroke="#2563eb" fill="url(#colorCases)" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export function StatusPieChart({ data }) {
    // data: [{ name, value }]
    return (
        <div className="bg-white p-4 rounded-2xl shadow">
            <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">Status Distribution</h4>
                <div className="text-xs text-gray-500">Realtime</div>
            </div>

            <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={70}
                            innerRadius={36}
                            paddingAngle={4}
                            label
                        >
                            {data.map((entry, idx) => (
                                <Cell key={`c-${idx}`} fill={COLORS[idx % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend verticalAlign="bottom" height={36} />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export function AttorneysBarChart({ data }) {
    // data: [{ name, cases }]
    return (
        <div className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">Top Attorneys</h4>
                <div className="text-xs text-gray-500">By caseload</div>
            </div>

            <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                    <BarChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="cases" radius={[6, 6, 0, 0]} fill="#3b82f6" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
