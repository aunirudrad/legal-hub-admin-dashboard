import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiFolder, FiUsers } from 'react-icons/fi';

const links = [
    { to: '/', label: 'Dashboard', icon: FiHome },
    { to: '/cases', label: 'Cases', icon: FiFolder },
    { to: '/users', label: 'Users', icon: FiUsers },
];

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r min-h-screen">
            <div className="p-6 font-bold text-lg">LegalHub</div>
            <nav className="p-4 space-y-1">
                {links.map(l => {
                    const Icon = l.icon;
                    return (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-2 rounded-lg transition-colors ${isActive
                                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`
                            }
                        >
                            <Icon className="w-5 h-5" />
                            <span>{l.label}</span>
                        </NavLink>
                    )
                })}
            </nav>

            <div className="mt-auto p-4 text-xs text-gray-500">
                <div className="mb-2">Logged as:</div>
                <div className="bg-gray-50 p-3 rounded">
                    <div className="font-medium">Admin One</div>
                    <div className="text-gray-400 text-xs">attorney</div>
                </div>
            </div>
        </aside>
    );
}
