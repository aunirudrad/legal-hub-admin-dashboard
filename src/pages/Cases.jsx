import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Table from '../components/Table';

export default function Cases() {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch('/data/dashboard.json').then(r => r.json()).then(setData);
    }, []);
    if (!data) return <div className="p-6">Loading...</div>;

    return (
        <Layout>
            <h2 className="text-2xl mb-4">All Cases</h2>
            <Table columns={['id', 'title', 'status', 'assignedTo', 'priority']} data={data.recentCases} />
        </Layout>
    );
}
