import React, {useCallback, useContext, useState} from 'react';
import styles from './modal.module.css';
import {useFormik} from "formik";
import * as Yup from "yup";
import socket from "../../socket/socket";
import {FriendsContext} from "../home/home";


const Modal = ({show, closeModal}) => {
    const [error, setError] = useState("");
    const onClose = useCallback(() => {
        setError("");
        closeModal();
    }, [closeModal])

    const {setFriendsList} = useContext(FriendsContext)

    const formik = useFormik({
        initialValues: {friendName: ''},
        validationSchema: Yup.object({
            friendName: Yup.string().required("Username required")
                .min(6, "Invalid Username")
                .max(20, "Invalid Username")
        }),
        onSubmit: (values, actions) => {
            socket.emit(
                "add_friend",
                values.friendName,
                ({errorMsg, done, newFriend}) => {
                    if (done) {
                        setFriendsList(c => [newFriend, ...c])
                        onClose();
                        return;
                    }
                    setError(errorMsg)
                });
            // closeModal();
            // alert(JSON.stringify(values, null, 2));
            // actions.resetForm();
        }
    })


    if (!show) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.overlay} onClick={onClose}/>
            <div className={styles.overlay}/>
            <div className={styles.dialog}>
                <h3>Add friend</h3>
                <p style={{color: 'red', fontSize: '17px', textAlign: "center"}}>{error}</p>
                <form onSubmit={formik.handleSubmit} className={styles.content}>
                    <div className={styles.formContainer}>
                        <input {...formik.getFieldProps('friendName')}/>
                        {formik.errors.friendName ? <div style={{color: 'red', fontSize: '12px'}}>{formik.errors.friendName}</div> : null}
                        <button type={'submit'}>ADD</button>
                    </div>
                </form>
                <button className={styles.close} onClick={onClose}>x</button>
            </div>
        </div>
    );
};

export default Modal;