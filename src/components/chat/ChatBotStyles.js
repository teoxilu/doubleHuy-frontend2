import styled from 'styled-components';

export const ChatContainer = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 300px;
    max-height: 400px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

export const ChatHeader = styled.div`
    background-color: #007bff;
    color: white;
    padding: 10px;
    text-align: center;
    cursor: pointer;
`;

export const ChatMessages = styled.div`
    padding: 10px;
    height: 300px;
    overflow-y: auto;
    background-color: #f9f9f9;
`;

export const ChatInputContainer = styled.form`
    display: flex;
    border-top: 1px solid #ccc;
`;

export const ChatInput = styled.input`
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 0;
    outline: none;
`;

export const ChatButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
`;

export const ChatBubble = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #007bff;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    cursor: pointer;
`;

export const Message = styled.div`
    background-color: ${({ isUser }) => (isUser ? '#DCF8C6' : '#FFF')};
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    max-width: 80%;
    align-self: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    border: ${({ isUser }) => (isUser ? '1px solid #34B7F1' : '1px solid #ddd')};
    p {
        margin: 0;
    }
`;
