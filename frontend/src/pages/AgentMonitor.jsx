import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Table from '../components/Table';
import { getAgentActivity } from '../services/analytics';

export default function AgentMonitor() {
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        getAgentActivity().then(setAgents);
    }, []);

    return (
        <Layout>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Agent Activity Monitor</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card title="System Load">
                    <div className="h-32 flex items-center justify-center bg-gray-50 rounded">
                        <span className="text-gray-400 italic">Live CPU/Memory Chart Placeholder</span>
                    </div>
                </Card>
                <Card title="Traffic">
                    <div className="h-32 flex items-center justify-center bg-gray-50 rounded">
                        <span className="text-gray-400 italic">Request Volume Chart Placeholder</span>
                    </div>
                </Card>
            </div>

            <Card title="Agent Status">
                <Table
                    headers={['Agent Name', 'Total Calls', 'Current Status']}
                    data={agents}
                    renderRow={(agent, idx) => (
                        <tr key={idx}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{agent.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agent.calls}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${agent.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                    {agent.status}
                                </span>
                            </td>
                        </tr>
                    )}
                />
            </Card>
        </Layout>
    );
}
