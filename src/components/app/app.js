import React from "react";

import {Container} from "react-bootstrap";
import MessageBox from "../message-box";
import './style.css';

const HOST = '0.0.0.0';
const PORT = '8080';
const RESOURCE = 'ws';

const App = () => {
    const NICKNAME = 'Димас';

    const socketConnection = new WebSocket(`ws://${HOST}:${PORT}/${RESOURCE}`)

    let id = 0;

    socketConnection.onopen = () => {
        socketConnection.send(`/join ${NICKNAME}`)
    }

    socketConnection.onmessage = (event) => {
        const message = event.data;
        if (message.startsWith('/id')) {
            id = message.split(' ')[1]
        }
    }

    return (
        <Container>
            <h1 className={"text-center"}>It's just of chat. Don't aggressive.</h1>
            <MessageBox socket={socketConnection} myId={id}/>
        </Container>
    )
}

export default App