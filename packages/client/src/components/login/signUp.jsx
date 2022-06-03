import React from 'react';
import {useNavigate} from "react-router";
import {useFormik} from "formik";

const SignUp = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate: (values) => {
            const errors = {};
            if (!values.username) {
                errors.username = 'Required';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'more 3'
            }
            return errors;
        },
        onSubmit: (values) => {
            const val = {...values};
            // actions.resetForm()
            alert(JSON.stringify(val));
        }
    })


    return (
        <div>
            <h2>SignUp</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <div>
                        <label>Email</label>
                        <input {...formik.getFieldProps('username')}/>
                        {formik.errors.username ? <div style={{color: 'red'}}>{formik.errors.username}</div> : null}
                        <label>Password</label>
                        <input type="password"
                               {...formik.getFieldProps('password')}/>
                        {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}

                        <button type={'submit'}>
                            Create Account
                        </button>
                        <button onClick={() => navigate("/login")}>
                            Back
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUp;