import React, {useEffect, useState} from "react";
import ChatWindow from "../chat-window";
import MessageTextForm from "../message-text-form";

const MessageBox = ({socket, myId}) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.onmessage = (event) => {
            const message = event.data;
            setMessages(messages => messages.concat(message))
        }
    })

    const onSend = (text) => {
        const body = JSON.stringify({id: myId, text: text})
        socket.send(body)
    }

    return (
        <>
            <ChatWindow messages={messages}/>
            <MessageTextForm userId={myId} send={(text) => onSend(text)}/>
        </>
    )
}
export default MessageBox