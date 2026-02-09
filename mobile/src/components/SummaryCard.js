import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SummaryCard({ title, value, subtext, color = '#4f46e5', onPress }) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <View style={[styles.card, { borderLeftColor: color }]}>
                <Text style={styles.title}>{title}</Text>
                <Text style={[styles.value, { color: color }]}>{value}</Text>
                {subtext && <Text style={styles.subtext}>{subtext}</Text>}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    title: {
        fontSize: 14,
        color: '#6b7280',
        fontWeight: '600',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    value: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtext: {
        fontSize: 12,
        color: '#9ca3af',
        marginTop: 4,
    },
});
