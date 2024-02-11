import React, {useState} from 'react';
import './LoginPage.css';
import {useDispatch} from 'react-redux';
import {setSuccessfulLogin} from "../../../features/auth/authSlice";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {

        if (password.length < 6 || username.length < 6) {
            setLoginError(true);
            setMessage('Verify entered data.')
            return;
        }

        if (password.length > 64 || username.length > 25) {
            setLoginError(true);
            setMessage('Verify entered data.')
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(username)) {
            setMessage('Verify entered data.')
            setLoginError(true);
            return;
        }

        try {
            setLoginError(false);
            const response = await axios.post('http://localhost:8080/login', {
                email: username,
                password: password
            });
            let userId = response.data;

            if(userId==="") {
                setLoginError(true)
                setMessage('Login failed, try again.')
                return
            }

            console.log('Login successful', response);
            dispatch(setSuccessfulLogin({userId, username}));
            navigate("/")
        } catch (error) {
            if (error.status === 403) {
                setLoginError(true)
                setMessage('Login failed, try again.')
                return;
            }
            console.error('Login failed', error);
            setLoginError(true);
            setMessage('An error occurred. Please try in a while.')
        }
    };

    const handleLoginChange = (e) => {
        setLoginError(false);
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setLoginError(false);
        setPassword(e.target.value);
    };

    return (
        <div className="container">
            <div className="auth-container">
                <h2>Login</h2>
                <div className="auth-form" type="form">
                    <label>Email:</label>
                    <input type="email" value={username} onChange={(e) => handleLoginChange(e)}/>

                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => handlePasswordChange(e)}/>

                    <button onClick={handleLogin}>Login</button>
                    {loginError && <p className="error-message">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
