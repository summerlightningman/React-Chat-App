import React from "react";


import './style.css';

const ChatWindow = ({messages}) => {
    return (
        <div className="chat-window">
            {messages.map((element, index) => <p key={index}>{element}</p>)}
        </div>
    )
}

export default ChatWindow
