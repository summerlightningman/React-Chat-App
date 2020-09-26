import React, {useState} from "react";
import {Button, FormControl, InputGroup} from "react-bootstrap";

const MessageTextForm = ({send}) => {
    const [textMessage, setTextMessage] = useState('')

    const handleInput = (event) => {
        const text = event.target.value;
        setTextMessage(text);
    }

    const handleClick = () => {
        send(textMessage);
        setTextMessage('');
    }

    return (
        <InputGroup>
            <FormControl onChange={(event) => handleInput(event)} value={textMessage}/>
            <InputGroup.Append>
                <Button variant={"outline-success"} onClick={() => handleClick()}>Отправить</Button>
            </InputGroup.Append>
        </InputGroup>
    )
}

export default MessageTextForm