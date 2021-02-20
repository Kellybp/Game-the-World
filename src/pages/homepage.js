import React, { useState } from 'react';
import {authMethods} from '../firebase/auth';
import firebase from 'firebase';

const Homepage = () => {
  const [userEmail] = useState(firebase.auth().currentUser.email);

  const handleLogOut = (event) => {
    event.preventDefault();

    authMethods.signOut();
  }

  return(
      <div>
          HOME PAGE 
          Logged User: {userEmail}
          <br />
          <button type="button" onClick={handleLogOut}> Logout</button>
      </div>
  );
}

export default Homepage;