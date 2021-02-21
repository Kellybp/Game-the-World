import React, { useState } from 'react';
import {authMethods} from '../firebase/auth';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';

const Login = () => {
    let history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (event) =>{
        event.preventDefault();

        console.log(username, password, authMethods);

        authMethods.signIn(username, password)
            .then(() => {
                history.push('/homepage');
            }).catch((e) => {
                alert(e.message);
            });
    };

    return(
    <div>
        LOGIN
        <form>
            <label htmlFor="email">Email</label>
            <input value={username} onChange={e => setUsername(e.target.value)} type="email"  placeholder="Username" name="email"/>
            <label htmlFor="password">Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" name="password"/>
            <button type="button" onClick={handleSubmit}> Login</button>
        </form>
    </div>
    );
}

export default Login;