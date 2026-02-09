import api from './api';

// Mocking some data for now as the backend analytics endpoints might not be fully populated
// In a real scenario, we would create dedicated endpoints for these stats.

export const getSystemStats = async () => {
    // Ideally: return api.get('/analytics/system');
    return {
        activeUsers: 142,
        totalLogs: 12503,
        agentInvocations: 3400,
        systemHealth: 98
    };
};

export const getAgentActivity = async () => {
    // Ideally: return api.get('/analytics/agents');
    return [
        { name: 'Health Agent', calls: 1200, status: 'Active' },
        { name: 'Finance Agent', calls: 850, status: 'Active' },
        { name: 'Study Agent', calls: 600, status: 'Idle' },
        { name: 'Travel Agent', calls: 300, status: 'Active' },
    ];
};

export const getUsers = async () => {
    // This is a real endpoint (sort of, we have crud but maybe not list all for admin yet)
    // We'll mock for the dashboard UI demo
    return [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'User', status: 'Active' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active' },
        { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'Admin', status: 'Active' },
    ];
};
