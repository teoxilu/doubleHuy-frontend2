import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    ChatContainer,
    ChatHeader,
    ChatMessages,
    ChatInputContainer,
    ChatInput,
    ChatButton,
    ChatBubble,
    Message
} from './ChatBotStyles';

const ChatBot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Tin nhắn đầu tiên từ chatbot
        setMessages([{ text: "Xin chào! Chúng tôi có thể giúp gì cho bạn?", isUser: false }]);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setMessages((prevMessages) => [...prevMessages, { text: input, isUser: true }]);

        try {
            const response = await axios.post('http://localhost:5000/chat', { prompt: input });
            const botMessage = response.data.choices[0].message.content.trim();
            setMessages((prevMessages) => [...prevMessages, { text: botMessage, isUser: false }]);
        } catch (error) {
            console.error('Error:', error);
        }

        setInput('');
    };

    return (
        <>
            <ChatBubble onClick={() => setIsVisible(!isVisible)}>
                💬
            </ChatBubble>
            <ChatContainer isVisible={isVisible}>
                <ChatHeader onClick={() => setIsVisible(false)}>
                    Chatbot
                </ChatHeader>
                <ChatMessages>
                    {messages.map((msg, index) => (
                        <Message key={index} isUser={msg.isUser}>
                            <p>{msg.text}</p>
                        </Message>
                    ))}
                </ChatMessages>
                <ChatInputContainer onSubmit={handleSubmit}>
                    <ChatInput
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <ChatButton type="submit">Send</ChatButton>
                </ChatInputContainer>
            </ChatContainer>
        </>
    );
};

export default ChatBot;
