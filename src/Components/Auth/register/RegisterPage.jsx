import React, {useState} from 'react';
import './RegisterPage.css';
import {useDispatch} from 'react-redux';
import axios from "axios";
import {setSuccessfulLogin} from "../../../features/auth/authSlice";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerError, setRegisterError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleRegister = async () => {
        if (email.length < 8) {
            setRegisterError(true);
            setErrorMessage('Too short email.');
            return;
        }

        if (email.length > 25) {
            setRegisterError(true);
            setErrorMessage('Too long email.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setRegisterError(true);
            setErrorMessage('Incorrect email');
            return;
        }

        if (password.length < 6) {
            setRegisterError(true);
            setErrorMessage('Too short password, at least 8 characters');
            return;
        }

        if (password.length > 64) {
            setRegisterError(true);
            setErrorMessage('Password doesnt have to be that long, you wont remember it ;)');
            return;
        }

        try {
            setRegisterError(false);
            const response = await axios.post('http://localhost:8080/register', {
                email: email,
                password: password
            });
            let userId = response.data;

            if(userId==="") {
                setRegisterError(true)
                setErrorMessage('Registration failed, try again.')
                return
            }
            let username = email
            console.log('Login successful', response);
            dispatch(setSuccessfulLogin({userId, username}));
            navigate("/")
        } catch (error) {
            console.error('Registration failed', error);
            setErrorMessage('Something went wrong. Try again in a moment.')
            setRegisterError(true);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        setRegisterError(false)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        setRegisterError(false)
    }

    return (
        <div className="container">

                <div className="auth-container">
                    <h2>Register</h2>
                    <div className="auth-form">

                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => {
                            handleEmailChange(e)
                        }}/>

                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => {
                            handlePasswordChange(e)
                        }}/>

                        <button onClick={handleRegister}>Register</button>
                        {registerError && <p className="error-message">{errorMessage}</p>}
                    </div>
                </div>

        </div>
    );
};

export default RegisterPage;
