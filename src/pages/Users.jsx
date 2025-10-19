import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Table from '../components/Table';

export default function Users() {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch('/data/dashboard.json').then(r => r.json()).then(setData);
    }, []);
    if (!data) return <div className="p-6">Loading...</div>;

    return (
        <Layout>
            <h2 className="text-2xl mb-4">Users</h2>
            <Table columns={['id', 'name', 'role', 'email']} data={data.users} />
        </Layout>
    );
}
