import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import Table from '../components/Table';
import { CasesAreaChart, StatusPieChart, AttorneysBarChart } from '../components/charts/Charts';

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/data/dashboard.json')
            .then(r => {
                if (!r.ok) throw new Error('Failed to fetch dashboard.json');
                return r.json();
            })
            .then(setData)
            .catch(err => {
                console.error(err);
                setError(err.message);
            });
    }, []);

    if (error) return <Layout><div className="p-6 text-red-600">Error: {error}</div></Layout>;
    if (!data) return <Layout><div className="p-6">Loading...</div></Layout>;

    const monthly = data.charts?.monthlyCases ?? [];
    const status = data.charts?.statusDistribution ?? [];
    const attorneys = data.charts?.attorneyWorkload ?? [];

    return (
        <Layout>
            <div className="grid grid-cols-12 gap-6 mb-6">
                <div className="col-span-12 lg:col-span-3"><StatCard title="Total Users" value={data.stats.totalUsers} kind="users" /></div>
                <div className="col-span-12 lg:col-span-3"><StatCard title="Active Cases" value={data.stats.activeCases} kind="cases" /></div>
                <div className="col-span-12 lg:col-span-3"><StatCard title="Open Tasks" value={data.stats.openTasks} kind="tasks" /></div>
                <div className="col-span-12 lg:col-span-3"><StatCard title="Monthly Revenue" value={`$${data.stats.monthlyRevenue}`} kind="revenue" /></div>
            </div>

            <div className="grid grid-cols-12 gap-6 mb-6">
                <div className="col-span-12 lg:col-span-7">
                    <CasesAreaChart data={monthly} />
                </div>

                <div className="col-span-12 lg:col-span-5 space-y-6">
                    <StatusPieChart data={status} />
                    <AttorneysBarChart data={attorneys} />
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-7">
                    <h3 className="text-lg font-semibold mb-3">Recent Cases</h3>
                    <Table columns={['id', 'title', 'status', 'assignedTo', 'priority']} data={data.recentCases} />
                </div>

                <div className="col-span-12 lg:col-span-5">
                    <h3 className="text-lg font-semibold mb-3">Users</h3>
                    <Table columns={['id', 'name', 'role', 'email']} data={data.users} />
                </div>
            </div>
        </Layout>
    );
}
