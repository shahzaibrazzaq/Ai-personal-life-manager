import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import api from '../services/api';

export default function ChatScreen() {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am your AI Assistant. How can I help you regarding Health, Finance, Study, or Travel?', id: 'init' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const flatListRef = useRef();

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input, id: Date.now().toString() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const response = await api.post('/chat/message', { message: userMsg.content });
            const botMsg = { role: 'assistant', content: response.data.response, id: (Date.now() + 1).toString() };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            const errorMsg = { role: 'assistant', content: 'Sorry, I encountered an error.', id: (Date.now() + 1).toString() };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={[
                        styles.messageBubble,
                        item.role === 'user' ? styles.userBubble : styles.botBubble
                    ]}>
                        <Text style={item.role === 'user' ? styles.userText : styles.botText}>
                            {item.content}
                        </Text>
                    </View>
                )}
            />

            {loading && <ActivityIndicator size="small" color="#4f46e5" style={{ margin: 10 }} />}

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Type a message..."
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage} disabled={loading}>
                    <Text style={styles.sendText}>Send</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Clean white background for chat
    },
    list: {
        padding: 20,
        paddingBottom: 20,
    },
    messageBubble: {
        padding: 12,
        borderRadius: 16,
        marginBottom: 8,
        maxWidth: '85%',
    },
    userBubble: {
        backgroundColor: '#4f46e5',
        alignSelf: 'flex-end',
        borderBottomRightRadius: 4,
    },
    botBubble: {
        backgroundColor: '#f3f4f6',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 4,
    },
    userText: {
        color: '#fff',
        fontSize: 16,
    },
    botText: {
        color: '#1f2937',
        fontSize: 16,
    },
    inputWrapper: {
        flexDirection: 'row',
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    input: {
        flex: 1,
        backgroundColor: '#f9fafb',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        fontSize: 16,
    },
    sendButton: {
        backgroundColor: '#4f46e5',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 24,
    },
    sendText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});
