import React, {useState} from "react";
import ChatWindow from "../chat-window";
import MessageTextForm from "../message-text-form";

const MessageBox = ({socket, myId}) => {

    const [messages, setMessages] = useState([]);

    socket.onmessage = (event) => {
        const message = event.data;
        console.log(message);
        if (message.startsWith('/id')) {
            myId = message.split(' ')[1]
        } else {
            setMessages(
                messages => messages.concat(message)
            )
        }
    }

    const onSend = (text) => {
        const body = JSON.stringify({id: myId, text: text})
        socket.send(body)
    }

    window.onbeforeunload = () => {socket.send(`/leave ${myId}`)}

    return (
        <>
            <ChatWindow messages={messages}/>
            <MessageTextForm userId={myId} send={(text) => onSend(text)}/>
        </>
    )
}
export default MessageBox