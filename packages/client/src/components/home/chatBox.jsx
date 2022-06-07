import React, {useContext} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import socket from "../../socket/socket";
import {MessagesContext} from "./home";
import styles from "./chatBox.module.css";


export const ChatBox = ({userid}) => {

    const {setMessages} = useContext(MessagesContext)

    const formik = useFormik({
        initialValues: {message: ''},
        validationSchema: Yup.object({
            message: Yup.string().min(1).max(255)
        }),
        onSubmit: (values, actions) => {
            const message = {to: userid, from: null, content: values.message}
            socket.emit("dm", message);
            setMessages(prevMsgs => [message, ...prevMsgs])
            // console.log(JSON.stringify(message));
            actions.resetForm();
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className={styles.chatBoxContainer}>
                    <textarea {...formik.getFieldProps('message')}
                              className={styles.messageText}/>
            <button type={'submit'} className={styles.btnSend}>SEND</button>
        </form>
    )
}