import React, {useContext} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import socket from "../../socket";
import {MessagesContext} from "./home";


export const ChatBox = ({friendIndex}) => {

    const {setMessages} = useContext(MessagesContext)

    const formik = useFormik({
        initialValues: {message: ''},
        validationSchema: Yup.object({
            message: Yup.string().min(1).max(255)
        }),
        onSubmit: (values, actions) => {
            const message = {to: friendIndex, from: null, content: values.message}
            socket.emit("dm", message);
            setMessages(prevMsgs => [...prevMsgs, message])
            // console.log(JSON.stringify(message));
            actions.resetForm();
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input {...formik.getFieldProps('message')} style={{border: "solid black 1px"}}/>
                    <button type={'submit'}>
                        SEND
                    </button>
                </div>
            </form>
        </div>
    )
}