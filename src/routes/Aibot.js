import React, { useState } from 'react';
import '../styles/Aibot.css';


export default function Aibot() {
    const [userMessage, setUserMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    const handleSendChat = () => {
        if (userMessage.trim() === '') return;

        setChatMessages([...chatMessages, { content: userMessage, role: 'user' }]);
        setUserMessage('');

        generateResponse(userMessage);
    };

    const generateResponse = (userMessage) => {
        const API_URL = "https://api.openai.com/v1/chat/completions";
        
        const API_KEY = "your-api-key"; 

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: userMessage}]
            })
        }

        // Sends POST request to OpenAI API
        fetch(API_URL, requestOptions)
            .then(res => res.json())
            .then(data => {
                const botResponse = data.choices[0].message.content.trim();
                setChatMessages(prevMessages => [...prevMessages, { content: botResponse, role: 'bot' }]);
            })
            .catch((error) => {
                console.error("Error:", error);
                setChatMessages(prevMessages => [...prevMessages, { content: "Oops! Something went wrong. Please Try Again!", role: 'bot' }]);
            });
    };
    

    const handleInputChange = (event) => {
        setUserMessage(event.target.value);
    };


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendChat();
        }
    };

    const handleDelete = () => {
        setUserMessage('');
    };

    return (
        <div>
            <head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            </head>

            {/* <div class="default-text">
                <h1>AI-Bot 😊</h1>
                <p>Hello! Ask Me Anything<br /> Start a conversation and explore the power of AI</p>
            </div> */}

            {/* Navbar */}
            <div className="navbar"></div>

            {/* Chat container */}
            <div className="chat-container">
                {chatMessages.map((message, index) => (
                    <div key={index} className={`chat ${message.role}`}>
                        <div className="chat-content">
                            <div className="chat-details">
                                <p className={message.role === 'user' ? 'chat incoming' : 'chat outgoing'}>
                                    {message.content}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Typing input */}
            <div className="typing-container">
                <div className="typing-content">
                    <div className="typing-textarea">
                        <textarea
                            id="chat-input"
                            spellCheck="false"
                            placeholder="Enter a prompt here"
                            value={userMessage}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        ></textarea>
                        <span
                            id="send-btn"
                            className="material-symbols-rounded"
                            onClick={handleSendChat}
                        >
                            Send
                        </span>
                    </div>

                    {/* Typing controls */}
                    <div className="typing-controls">
                        <span id="delete-btn" className="material-symbols-rounded" onClick={handleDelete}>delete</span>
                        <span id="theme-btn" className="material-symbols-rounded">L/D</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
