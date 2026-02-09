import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, UsersIcon, CpuChipIcon, ChartBarIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { logout } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Users', href: '/users', icon: UsersIcon },
    { name: 'Agent Monitor', href: '/agents', icon: CpuChipIcon },
    { name: 'System Logs', href: '/logs', icon: ChartBarIcon },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Layout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="hidden md:flex md:w-64 md:flex-col">
                <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-indigo-700">
                    <div className="flex items-center flex-shrink-0 px-4">
                        <h1 className="text-xl font-bold text-white">AI-PLM Admin</h1>
                    </div>
                    <div className="mt-5 flex-1 flex flex-col">
                        <nav className="flex-1 px-2 space-y-1">
                            {navigation.map((item) => {
                                const isActive = location.pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={classNames(
                                            isActive
                                                ? 'bg-indigo-800 text-white'
                                                : 'text-indigo-100 hover:bg-indigo-600',
                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                        )}
                                    >
                                        <item.icon className="mr-3 flex-shrink-0 h-6 w-6" aria-hidden="true" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                        <div className="p-4 border-t border-indigo-600">
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full px-2 py-2 text-sm font-medium text-indigo-100 rounded-md hover:bg-indigo-600 group"
                            >
                                <ArrowLeftStartOnRectangleIcon className="mr-3 flex-shrink-0 h-6 w-6" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
