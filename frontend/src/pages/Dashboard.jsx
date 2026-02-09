import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { sendMessage } from '../services/chat';
import { getCurrentUser, logout } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am your AI Personal Life Manager. How can I help you with Health, Finance, Study, or Travel today?' }
    ]);
    const navigate = useNavigate();

    const chatMutation = useMutation({
        mutationFn: sendMessage,
        onSuccess: (data) => {
            setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
        },
    });

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages((prev) => [...prev, { role: 'user', content: input }]);
        chatMutation.mutate(input);
        setInput('');
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-4 font-bold text-xl text-indigo-600">AI-PLM</div>
                <nav className="mt-4">
                    <a href="#" className="block px-4 py-2 text-gray-700 bg-gray-200">Chat</a>
                    <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Health</a>
                    <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Finance</a>
                    <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Study</a>
                    <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Travel</a>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 mt-10">Logout</button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow p-4">
                    <h1 className="text-xl font-semibold text-gray-800">Overview</h1>
                </header>

                <main className="flex-1 p-6 overflow-hidden flex flex-col">
                    {/* Chat Interface */}
                    <div className="flex-1 bg-white rounded-lg shadow p-4 flex flex-col">
                        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`p-3 rounded-lg max-w-xl ${msg.role === 'user' ? 'bg-indigo-100 ml-auto' : 'bg-gray-100'}`}>
                                    <p className="text-sm text-gray-800">{msg.content}</p>
                                </div>
                            ))}
                            {chatMutation.isPending && <div className="text-sm text-gray-500 italic">AI is thinking...</div>}
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Ask me anything..."
                            />
                            <button
                                onClick={handleSend}
                                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                                disabled={chatMutation.isPending}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
