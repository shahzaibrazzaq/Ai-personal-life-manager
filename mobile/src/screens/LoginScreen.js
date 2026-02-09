import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

// Replace with your machine's IP address if running on physical device or emulator
const API_URL = 'http://10.0.2.2:8000/api/v1';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const formData = new FormData();
            formData.append('username', email);
            formData.append('password', password);

            const response = await axios.post(`${API_URL}/auth/login`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.access_token) {
                navigation.replace('Dashboard', { token: response.data.access_token });
            }
        } catch (error) {
            Alert.alert('Login Failed', 'Invalid credentials or server error.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>AI-PLM</Text>
            <Text style={styles.subtitle}>Personal Life Manager</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#4f46e5',
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 50,
        color: '#666',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#f3f4f6',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        width: '100%',
    },
    button: {
        backgroundColor: '#4f46e5',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});
