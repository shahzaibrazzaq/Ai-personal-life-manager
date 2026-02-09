import React from 'react';

export default function Card({ title, children, className = '' }) {
    return (
        <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
            {title && <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>}
            {children}
        </div>
    );
}
