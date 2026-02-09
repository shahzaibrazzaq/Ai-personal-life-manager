import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import InputForm from '../components/InputForm';
import api from '../services/api';

export default function DomainDetailScreen({ route, navigation }) {
    const { domain } = route.params;
    const [logs, setLogs] = useState([]);

    // Configuration for forms based on domain
    const formConfigs = {
        health: [
            { name: 'type', label: 'Type (diet/exercise)', placeholder: 'e.g. diet' },
            { name: 'details', label: 'Details', placeholder: 'e.g. {"calories": 500}' }
        ],
        finance: [
            { name: 'amount', label: 'Amount ($)', placeholder: '0.00', keyboardType: 'numeric' },
            { name: 'category', label: 'Category', placeholder: 'Food, Rent...' },
            { name: 'description', label: 'Description', placeholder: 'Lunch at cafe' }
        ],
        study: [
            { name: 'subject', label: 'Subject', placeholder: 'Math' },
            { name: 'content', label: 'Note Content', placeholder: 'Studied algebra...' }
        ],
        travel: [
            { name: 'destination', label: 'Destination', placeholder: 'Paris' },
            { name: 'budget', label: 'Budget', placeholder: '2000', keyboardType: 'numeric' }
        ]
    };

    const handleLogSubmit = async (data) => {
        try {
            // In a real app, map 'domain' to correct endpoint
            let endpoint = `/${domain}`;
            let payload = { ...data };

            // Simple transformation for demo purposes
            if (domain === 'health') {
                payload.details = JSON.parse(data.details || '{}');
            }
            if (domain === 'finance') {
                payload.amount = parseFloat(data.amount);
                payload.is_expense = true;
            }
            if (domain === 'study') {
                payload.tags = [];
            }

            await api.post(endpoint, payload);
            Alert.alert('Success', 'Log added successfully');
            // Refresh logs...
        } catch (error) {
            Alert.alert('Error', 'Failed to add log. Ensure valid input.');
            console.error(error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{domain.charAt(0).toUpperCase() + domain.slice(1)} Management</Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Add New Log</Text>
                <InputForm
                    fields={formConfigs[domain] || []}
                    onSubmit={handleLogSubmit}
                    submitText="Add Log"
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Recent Activity</Text>
                <Text style={{ color: '#9ca3af', fontStyle: 'italic' }}>No recent logs fetched.</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafe',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#111827',
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#374151',
    }
});
