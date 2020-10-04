import 'bootstrap/dist/css/bootstrap.min.css'

import React, {useEffect} from "react";

import {Container} from "react-bootstrap";

import './style.css';
import MessageBox from "../message-box";

const HOST = '0.0.0.0';
const PORT = '8080';
const RESOURCE = 'ws';

const App = () => {
    const NICKNAME = 'Димас';
    let id = 0;

    const socketConnection = new WebSocket(`ws://${HOST}:${PORT}/${RESOURCE}`)

    useEffect(() => {
        socketConnection.onopen = () => {
            socketConnection.send(`/join ${NICKNAME}`)
        }

        socketConnection.onmessage = (event) => {
            const message = event.data;
            if (message.startsWith('/id')) {
                id = message.split(' ')[1]
            }
        }

        return () => {
            socketConnection.send(`/leave ${id}`)
            socketConnection.close()
        }
    })


    return (
        <Container>
            <h1 className={"text-center"}>It's just of chat. Don't aggressive.</h1>
            <MessageBox socket={socketConnection} myId={id}/>
        </Container>
    )
}

export default App