import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './pages/Login';
import DashboardHome from './pages/DashboardHome';
import UserManagement from './pages/UserManagement';
import AgentMonitor from './pages/AgentMonitor';
import SystemLogs from './pages/SystemLogs';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<DashboardHome />} />
                    <Route path="/users" element={<UserManagement />} />
                    <Route path="/agents" element={<AgentMonitor />} />
                    <Route path="/logs" element={<SystemLogs />} />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
