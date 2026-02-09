import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Table from '../components/Table';
import Card from '../components/Card';
import { getUsers } from '../services/analytics';

export default function UserManagement() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then(setUsers);
    }, []);

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Add User</button>
            </div>

            <Card>
                <Table
                    headers={['Name', 'Email', 'Role', 'Status', 'Actions']}
                    data={users}
                    renderRow={(user, idx) => (
                        <tr key={idx}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                    {user.role}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {user.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                <button className="text-red-600 hover:text-red-900">Delete</button>
                            </td>
                        </tr>
                    )}
                />
            </Card>
        </Layout>
    );
}
