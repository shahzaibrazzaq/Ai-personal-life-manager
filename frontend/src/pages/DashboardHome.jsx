import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { getSystemStats } from '../services/analytics';
import { UsersIcon, ChartBarIcon, CpuChipIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow p-6 flex items-center">
        <div className={`p-3 rounded-full ${color} bg-opacity-10 mr-4`}>
            <Icon className={`h-8 w-8 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
    </div>
);

export default function DashboardHome() {
    const [stats, setStats] = useState({
        activeUsers: 0,
        totalLogs: 0,
        agentInvocations: 0,
        systemHealth: 100
    });

    useEffect(() => {
        getSystemStats().then(setStats);
    }, []);

    return (
        <Layout>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Active Users" value={stats.activeUsers} icon={UsersIcon} color="text-blue-600 bg-blue-600" />
                <StatCard title="Agent Calls" value={stats.agentInvocations} icon={CpuChipIcon} color="text-purple-600 bg-purple-600" />
                <StatCard title="Total Logs" value={stats.totalLogs.toLocaleString()} icon={ChartBarIcon} color="text-green-600 bg-green-600" />
                <StatCard title="System Health" value={`${stats.systemHealth}%`} icon={ShieldCheckIcon} color="text-indigo-600 bg-indigo-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Traffic Overview">
                    <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                        <span className="text-gray-400 italic">Traffic Chart Placeholder</span>
                    </div>
                </Card>
                <Card title="Agent Distribution">
                    <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                        <span className="text-gray-400 italic">Pie Chart Placeholder</span>
                    </div>
                </Card>
            </div>
        </Layout>
    );
}
