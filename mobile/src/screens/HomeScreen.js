import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import SummaryCard from '../components/SummaryCard';
import api from '../services/api';

export default function HomeScreen({ navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const [metrics, setMetrics] = useState({
        health: { calories: 0, steps: 0 },
        finance: { spent: 0, budget: 0 },
        study: { tasks: 0 },
        travel: { upcoming: 0 }
    });

    const fetchData = async () => {
        // In a real app, these would be separate calls or an aggregate endpoint
        // Using mocks/placeholders for now as user just joined
        // Or we could hit the endpoints we made if we had data
        setMetrics({
            health: { calories: 1200, steps: 5400 },
            finance: { spent: 450, budget: 1000 },
            study: { tasks: 3 },
            travel: { upcoming: 1 }
        });
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Overview</Text>
                <Text style={styles.date}>{new Date().toDateString()}</Text>
            </View>

            <View style={styles.grid}>
                <SummaryCard
                    title="Health"
                    value={`${metrics.health.calories} kcal`}
                    subtext={`${metrics.health.steps} steps today`}
                    color="#10b981"
                    onPress={() => navigation.navigate('DomainDetail', { domain: 'health' })}
                />
                <SummaryCard
                    title="Finance"
                    value={`$${metrics.finance.spent}`}
                    subtext={`of $${metrics.finance.budget} budget`}
                    color="#f59e0b"
                    onPress={() => navigation.navigate('DomainDetail', { domain: 'finance' })}
                />
                <SummaryCard
                    title="Study"
                    value={`${metrics.study.tasks}`}
                    subtext="Pending Tasks"
                    color="#6366f1"
                    onPress={() => navigation.navigate('DomainDetail', { domain: 'study' })}
                />
                <SummaryCard
                    title="Travel"
                    value={`${metrics.travel.upcoming}`}
                    subtext="Upcoming Trip"
                    color="#ec4899"
                    onPress={() => navigation.navigate('DomainDetail', { domain: 'travel' })}
                />
            </View>

            {/* Quick Actions */}
            <View style={styles.actionSection}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.actionGrid}>
                    {/* We can add buttons here later */}
                </View>
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
    header: {
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111827',
    },
    date: {
        color: '#6b7280',
        fontSize: 14,
    },
    grid: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#374151'
    }
});
