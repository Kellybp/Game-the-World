import React, { useState } from 'react';
import {authMethods} from '../firebase/auth';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) =>{
    event.preventDefault();

    authMethods.signUp(username, password)
        .then((data) => {
            console.log(data);
        }).catch((e) => {
            alert(e.message);
        })
  };

  return(
      <div>
          REGISTER
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

export default Register;