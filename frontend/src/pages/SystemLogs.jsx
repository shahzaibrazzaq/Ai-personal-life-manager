import React from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Table from '../components/Table';

const mockLogs = [
    { timestamp: '2024-03-20 10:23:01', level: 'INFO', module: 'Auth', message: 'User login success: alice@example.com' },
    { timestamp: '2024-03-20 10:24:15', level: 'INFO', module: 'Supervisor', message: 'Routed request to Health_Agent' },
    { timestamp: '2024-03-20 10:24:16', level: 'DEBUG', module: 'Health_Agent', message: 'Calculated BMI: 22.4' },
    { timestamp: '2024-03-20 10:25:00', level: 'WARN', module: 'Finance_Agent', message: 'Constraint check failed: Budget limit exceeded' },
    { timestamp: '2024-03-20 10:26:01', level: 'ERROR', module: 'Travel_API', message: 'Timeout connecting to flight provider' },
];

export default function SystemLogs() {
    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">System Logs</h2>
                <div className="flex gap-2">
                    <button className="text-gray-600 bg-white border border-gray-300 px-3 py-1 rounded hover:bg-gray-50">Filter</button>
                    <button className="text-gray-600 bg-white border border-gray-300 px-3 py-1 rounded hover:bg-gray-50">Export</button>
                </div>
            </div>

            <Card>
                <Table
                    headers={['Timestamp', 'Level', 'Module', 'Message']}
                    data={mockLogs}
                    renderRow={(log, idx) => (
                        <tr key={idx}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${log.level === 'INFO' ? 'bg-blue-100 text-blue-800' :
                                        log.level === 'WARN' ? 'bg-yellow-100 text-yellow-800' :
                                            log.level === 'ERROR' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                                    {log.level}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{log.module}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{log.message}</td>
                        </tr>
                    )}
                />
            </Card>
        </Layout>
    );
}
