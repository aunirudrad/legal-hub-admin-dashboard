import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FiSearch, FiBell, FiSun, FiMoon, FiUser, FiSettings, FiLogOut, FiX
} from 'react-icons/fi';

export default function Header() {
    const navigate = useNavigate();
    const [user] = useState(() => JSON.parse(localStorage.getItem('legalhub_user') || 'null'));
    const [data, setData] = useState(null);

    // Search state
    const [q, setQ] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const searchTimer = useRef(null);

    // Notifications
    const [notifications, setNotifications] = useState([]);
    const [showNotif, setShowNotif] = useState(false);

    // User menu
    const [showUserMenu, setShowUserMenu] = useState(false);

    // Theme
    const [theme, setTheme] = useState(() => localStorage.getItem('legalhub_theme') || 'light');

    const wrapperRef = useRef(null);

    useEffect(() => {
        // fetch dashboard data (cases/users) once
        fetch('/data/dashboard.json')
            .then(r => r.json())
            .then(json => {
                setData(json);
                // populate notifications from recent cases (mark unread by default)
                const notifs = (json.recentCases || []).map((c, idx) => ({
                    id: c.id || `n-${idx}`,
                    title: c.title,
                    meta: `${c.assignedTo} · ${c.priority}`,
                    status: c.status,
                    read: false,
                    timestamp: Date.now() - idx * 1000 * 60 * 60 // mock times
                }));
                setNotifications(notifs);
            })
            .catch(err => {
                console.error('Failed loading dashboard.json for header', err);
            });
    }, []);

    // Theme effect
    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
        localStorage.setItem('legalhub_theme', theme);
    }, [theme]);

    // Debounced search
    useEffect(() => {
        if (!q) {
            setSuggestions([]);
            return;
        }
        if (searchTimer.current) clearTimeout(searchTimer.current);
        searchTimer.current = setTimeout(() => {
            const txt = q.toLowerCase();
            const cases = (data?.recentCases || []).filter(c => (c.title || '').toLowerCase().includes(txt));
            const users = (data?.users || []).filter(u => (u.name || '').toLowerCase().includes(txt));
            const items = [
                ...cases.slice(0, 5).map(c => ({ type: 'case', label: c.title, meta: c.id, payload: c })),
                ...users.slice(0, 5).map(u => ({ type: 'user', label: u.name, meta: u.role, payload: u }))
            ];
            setSuggestions(items);
        }, 260); // small debounce
        return () => clearTimeout(searchTimer.current);
    }, [q, data]);

    // click outside to close dropdowns
    useEffect(() => {
        function onDocClick(e) {
            if (!wrapperRef.current) return;
            if (!wrapperRef.current.contains(e.target)) {
                setShowNotif(false);
                setShowUserMenu(false);
                setShowSearch(false);
            }
        }
        window.addEventListener('click', onDocClick);
        window.addEventListener('keydown', (ev) => {
            if (ev.key === 'Escape') {
                setShowNotif(false); setShowUserMenu(false); setShowSearch(false);
            }
        });
        return () => {
            window.removeEventListener('click', onDocClick);
        };
    }, []);

    // handlers
    const onLogout = () => {
        localStorage.removeItem('legalhub_user');
        navigate('/login');
    };

    const unreadCount = notifications.filter(n => !n.read).length;
    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };
    const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

    const onSuggestionClick = (s) => {
        setQ('');
        setSuggestions([]);
        setShowSearch(false);
        // quick navigation behavior
        if (s.type === 'case') {
            // for now go to /cases page and highlight could be added later
            navigate('/cases');
        } else if (s.type === 'user') {
            navigate('/users');
        }
    };

    return (
        <header className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-900 dark:border-gray-700" ref={wrapperRef}>
            <div className="flex items-center gap-4">
                {/* <div className="text-sm text-gray-600 dark:text-gray-300">Welcome to LegalHub Dashboard</div> */}

                {/* Search */}
                <div className="relative">
                    <div
                        className={`relative flex items-center rounded-lg border bg-gray-50 dark:bg-gray-800 dark:border-gray-700 transition ${showSearch ? 'ring-2 ring-indigo-200 dark:ring-indigo-800' : ''
                            }`}
                    >
                        <FiSearch className="ml-3 text-gray-400 dark:text-gray-300" />
                        <input
                            value={q}
                            onChange={e => { setQ(e.target.value); setShowSearch(true); }}
                            onFocus={() => setShowSearch(true)}
                            placeholder="Search cases & users..."
                            className="pl-2 pr-3 py-2 w-72 bg-transparent text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
                        />
                        {q && (
                            <button onClick={() => { setQ(''); setSuggestions([]); }} className="p-2">
                                <FiX className="text-gray-400" />
                            </button>
                        )}
                    </div>

                    {/* suggestions dropdown */}
                    {showSearch && suggestions.length > 0 && (
                        <div className="absolute mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 animate-fade-slide">
                            <div className="p-2 text-xs text-gray-500 dark:text-gray-400">Suggestions</div>
                            <div className="divide-y dark:divide-gray-700">
                                {suggestions.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => onSuggestionClick(s)}
                                        className="w-full text-left px-3 py-2 hover:bg-indigo-50 dark:hover:bg-gray-700 flex justify-between items-center"
                                    >
                                        <div>
                                            <div className="text-sm text-gray-800 dark:text-gray-100">{s.label}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{s.meta}</div>
                                        </div>
                                        <div className="text-xs text-gray-400">{s.type}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* theme toggle */}
                <button
                    title="Toggle theme"
                    onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
                    className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                    {theme === 'light' ? <FiSun className="w-5 h-5 text-yellow-500" /> : <FiMoon className="w-5 h-5 text-indigo-300" />}
                </button>

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={(e) => { e.stopPropagation(); setShowNotif(v => !v); setShowUserMenu(false); }}
                        className="relative p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        aria-label="Notifications"
                        title="Notifications"
                    >
                        <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium rounded-full bg-red-500 text-white">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {/* notifications dropdown */}
                    {showNotif && (
                        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 animate-fade-slide overflow-hidden">
                            <div className="flex items-center justify-between p-3 border-b dark:border-gray-700">
                                <div className="text-sm font-medium text-gray-800 dark:text-gray-100">Notifications</div>
                                <button onClick={markAllRead} className="text-xs text-indigo-600 dark:text-indigo-400">Mark all read</button>
                            </div>

                            <div className="max-h-56 overflow-auto">
                                {notifications.length === 0 && <div className="p-3 text-sm text-gray-500">No notifications</div>}
                                {notifications.map(n => (
                                    <div key={n.id} className={`p-3 flex gap-3 items-start hover:bg-gray-50 dark:hover:bg-gray-700 transition ${n.read ? 'opacity-70' : ''}`}>
                                        <div className="w-3 h-3 mt-2 rounded-full" style={{ background: n.read ? '#cbd5e1' : '#2563eb' }} />
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-gray-800 dark:text-gray-100">{n.title}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{n.meta}</div>
                                            <div className="text-xs text-gray-400 mt-1">{new Date(n.timestamp).toLocaleString()}</div>
                                        </div>
                                        {!n.read ? (
                                            <button onClick={() => markAsRead(n.id)} className="text-xs text-indigo-600 dark:text-indigo-400">Mark read</button>
                                        ) : null}
                                    </div>
                                ))}
                            </div>

                            <div className="p-3 border-t dark:border-gray-700 text-center">
                                <button onClick={() => { setShowNotif(false); navigate('/cases'); }} className="text-sm text-indigo-600">View all cases</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* user menu */}
                <div className="relative">
                    <button
                        onClick={(e) => { e.stopPropagation(); setShowUserMenu(v => !v); setShowNotif(false); }}
                        className="flex items-center gap-2 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        aria-label="User menu"
                    >
                        <div className="w-9 h-9 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center text-white shadow">
                            {user ? user.name?.charAt(0) : 'G'}
                        </div>
                        <div className="hidden md:block text-left">
                            <div className="text-sm text-gray-800 dark:text-gray-100">{user ? user.name : 'Guest'}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{user ? user.role : ''}</div>
                        </div>
                    </button>

                    {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 animate-fade-slide">
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2" onClick={() => { setShowUserMenu(false); navigate('/'); }}>
                                <FiUser /> <span className="text-sm">Profile</span>
                            </button>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2" onClick={() => { setShowUserMenu(false); navigate('/'); }}>
                                <FiSettings /> <span className="text-sm">Settings</span>
                            </button>
                            <div className="border-t dark:border-gray-700" />
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-red-600" onClick={onLogout}>
                                <FiLogOut /> <span className="text-sm">Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
