import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('attorney'); // default

    const submit = (e) => {
        e.preventDefault();
        const user = { name: name || 'Demo User', email, role };
        localStorage.setItem('legalhub_user', JSON.stringify(user));
        navigate('/');
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={submit} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-xl mb-4">LegalHub — Login (mock)</h2>

                <label className="block mb-2 text-sm">Name</label>
                <input value={name} onChange={e => setName(e.target.value)} className="w-full mb-3 p-2 border rounded" />

                <label className="block mb-2 text-sm">Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} className="w-full mb-3 p-2 border rounded" />

                <label className="block mb-2 text-sm">Role</label>
                <select value={role} onChange={e => setRole(e.target.value)} className="w-full mb-4 p-2 border rounded">
                    <option value="admin">admin</option>
                    <option value="attorney">attorney</option>
                    <option value="staff">staff</option>
                </select>

                <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">Login</button>
                <p className="mt-3 text-xs text-gray-500">Use role `admin` or `attorney` to access dashboard routes.</p>
            </form>
        </div>
    );
}
