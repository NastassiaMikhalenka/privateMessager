import React from 'react';
import styles from './modal.module.css';
import {useFormik} from "formik";
import * as Yup from "yup";


const Modal = ({show, closeModal}) => {

    const formik = useFormik({
        initialValues: {friendName: ''},
        validationSchema: Yup.object({
            friendName: Yup.string().required("Username required")
                .min(6, "Invalid Username")
                .max(20, "Invalid Username")
        }),
        onSubmit: (values, actions) => {
            closeModal();
            alert(JSON.stringify(values, null, 2));
            actions.resetForm();
        }
    })


    if (!show) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.overlay} onClick={closeModal}/>
            <div className={styles.overlay}/>
            <div className={styles.dialog}>
                <h3>Add friend</h3>
                <form onSubmit={formik.handleSubmit} className={styles.content}>
                    <div className={styles.formContainer}>
                        <input {...formik.getFieldProps('friendName')}/>
                        {formik.errors.friendName ? <div style={{color: 'red'}}>{formik.errors.friendName}</div> : null}
                        <button type={'submit'}>
                            ADD
                        </button>
                    </div>
                </form>
                <button className={styles.close} onClick={closeModal}>x</button>
            </div>
        </div>
    );
};

export default Modal;