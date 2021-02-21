import React, { useEffect, useState } from 'react';
import {authMethods} from '../firebase/auth';
import firebase from 'firebase';

const Homepage = () => {
  const [userEmail] = useState(firebase.auth().currentUser.email);
  const [nextPage, setNextPage] = useState('https://api.predicthq.com/v1/events/');
  const [events, setEvents] = useState([]);

  const getNextEventPage = () => {
    fetch(
      // TODO: Add pagination params and query
      nextPage,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer I3wXlZeWAVocJWGRpIucsRBYwwrn_653PkF0vz9h'
        },
      }
    ).then((res) => {
      res.json().then((data) => {
        console.log(events[0])
        const newEvents = [
          ...events,
          ...data.results,
        ]
        setEvents(
          newEvents
        );

        setNextPage(
          data.next
        );
        // console.log(data)
      });
    });
  }

  const handleLogOut = (event) => {
    event.preventDefault();

    authMethods.signOut();
  }

  useEffect(() => {
    getNextEventPage();
  }, [])

  return(
      <div>
          HOME PAGE 
          Logged User: {userEmail}
          <br />
          <button type="button" onClick={handleLogOut}> Logout</button>
          <button type="button" onClick={getNextEventPage}> NextPage</button>
          <div>

          <b>{events.length}-{nextPage}</b>
          {events.map((event, index) => {
            const {id, title} = event;
            
            return (
              <p key={`${index}-${id}`}>
                {title}
              </p>
            );
          })}
          </div>
      </div>
  );
}

export default Homepage;