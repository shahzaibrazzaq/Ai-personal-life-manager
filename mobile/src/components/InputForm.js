import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function InputForm({ fields, onSubmit, submitText = "Submit" }) {
    const [formData, setFormData] = useState({});

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
        setFormData({}); // Reset optionally
    };

    return (
        <View style={styles.container}>
            {fields.map((field) => (
                <View key={field.name} style={styles.inputGroup}>
                    <Text style={styles.label}>{field.label}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={field.placeholder}
                        keyboardType={field.keyboardType || 'default'}
                        value={formData[field.name] || ''}
                        onChangeText={(text) => handleChange(field.name, text)}
                        secureTextEntry={field.secure}
                    />
                </View>
            ))}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>{submitText}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: '#374151',
        marginBottom: 5,
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4f46e5',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
