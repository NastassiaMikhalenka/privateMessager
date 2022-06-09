import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router";
import {useFormik} from "formik";
import styles from "./auth.module.css";
import * as Yup from "yup";
import {Frame} from "../common/frame/frame";
import {AccountContext} from "../accountContext";


const Login = () => {
    const {setUser} = useContext(AccountContext)
    const navigate = useNavigate();
    const [error, setError] = useState(null)

    // eye pass styles
    const [isShown, setIsShow] = useState(false);
    const togglePassword = () => setIsShow(!isShown);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username required")
                .min(6, "Username to short")
                .max(20, "Username to long"),
            password: Yup.string().required("Password required")
                .min(6, "Password to short")
                .max(20, "Password to long"),
        }),
        onSubmit: (values, actions) => {
            const val = {...values};
            actions.resetForm()
            fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
            // fetch("http://localhost:4000/auth/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(val),
            }).catch(err => {
                return;
            }).then(res => {
                if (!res || !res.ok || res.status >= 400) {
                    return;
                }
                return res.json();
            })
                .then(data => {
                    if (!data) return;
                    setUser({...data});
                    if (data.status) {
                        setError(data.status);
                    } else if(data.loggedIn){
                        navigate('/home');
                    }
                })
        }
    })


    return (
        <Frame>
            <h2 className={styles.text}>Login</h2>
            <p style={{color: 'red', fontSize: '17px', textAlign: "center"}}>{error}</p>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <div className={styles.input}>
                    <label>Name</label>
                    <input {...formik.getFieldProps('username')} placeholder={"Your name"}
                           className={styles.inputName}/>
                    {formik.errors.username ?
                        <div style={{color: 'red', fontSize: '12px'}}>{formik.errors.username}</div> : null}
                </div>
                <div className={styles.input}>
                    <label>Password</label>
                    <div className={styles.inputContainer}>
                        <input type="password"
                               {...formik.getFieldProps('password')} placeholder={"Your password"}
                               className={styles.inputName}/>
                        <button onClick={togglePassword}
                                className={`${styles.eye} ${isShown && styles.eyeShow}`}></button>
                    </div>
                    {formik.errors.password ?
                        <div style={{color: 'red', fontSize: '12px'}}>{formik.errors.password}</div> : null}
                </div>
                <div className={styles.btnContainer}>
                    <button type={'submit'} className={styles.btn}>Login</button>
                    <button onClick={() => navigate("/register")} className={styles.btnExtra}>Create Account</button>
                </div>
            </form>
        </Frame>
    );
};

export default Login;