import React from 'react'
import { FiUsers, FiFileText, FiCheckCircle, FiDollarSign } from 'react-icons/fi'

const ICON_MAP = {
    users: FiUsers,
    cases: FiFileText,
    tasks: FiCheckCircle,
    revenue: FiDollarSign
}

export default function StatCard({ title, value, kind = 'users' }) {
    const Icon = ICON_MAP[kind] || FiUsers
    return (
        <div className="bg-white p-5 rounded-2xl shadow-lg-soft hover:shadow-lg transition-transform transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-xs text-gray-500">{title}</div>
                    <div className="text-2xl font-extrabold text-gray-900 mt-2">{value}</div>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-brand-100 to-brand-200 animate-float">
                    <Icon className="w-6 h-6 text-brand-700" />
                </div>
            </div>
        </div>
    )
}
