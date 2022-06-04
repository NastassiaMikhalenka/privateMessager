import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router";
import {useFormik} from "formik";
import styles from "./login.module.css";
import * as Yup from "yup";
import {AccountContext} from "../accountContext";


const Login = () => {
    const {setUser} = useContext(AccountContext)
    const navigate = useNavigate();
    const [error, setError] = useState(null)

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
        // validate: (values) => {
        //     const errors = {};
        //     if (!values.username) {
        //         errors.username = 'Required';
        //     }
        //     if (!values.password) {
        //         errors.password = 'Required';
        //     } else if (values.password.length < 3) {
        //         errors.password = 'more 3'
        //     }
        //     return errors;
        // },
        onSubmit: (values, actions) => {
            const val = {...values};
            actions.resetForm()
            fetch("http://localhost:4000/auth/login", {
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
                    // console.log(data);
                    setUser({...data});
                    if (data.status) {
                        setError(data.status);
                    } else if(data.loggedIn){
                        navigate('/home');
                    }
                })
            // alert(JSON.stringify(val));
        }
    })


    return (

        <div className={styles.container}>
            <h2>Login</h2>
            <p>{error}</p>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <div className={styles.formContainer}>
                    <label>Email</label>
                    <input {...formik.getFieldProps('username')}/>
                    {formik.errors.username ? <div style={{color: 'red'}}>{formik.errors.username}</div> : null}
                    <label>Password</label>
                    <input type="password"
                           {...formik.getFieldProps('password')}/>
                    {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}

                    <button type={'submit'}>
                        Login
                    </button>
                    <button onClick={() => navigate("/register")}>
                        Create Account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;