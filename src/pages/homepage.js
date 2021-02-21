import React, {useEffect, useState} from 'react';
import {authMethods} from '../firebase/auth';
import firebase from 'firebase';
import {Button, Layout} from 'antd';
import HomepageWrapper from '../components/HomepageWrapper'

const {Header, Footer, Sider, Content} = Layout;

const Homepage = () => {
  const [userEmail] = useState(firebase.auth().currentUser.email);
  const [userPosition, setUserPosition] = useState([]);
  const [nextPage, setNextPage] = useState('https://api.predicthq.com/v1/events/?q=rit');
  const [events, setEvents] = useState([]);

  const getUserPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserPosition([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      }, () => {
        alert('You need to enable location services in order to use the app.');
      });
    }
  }

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
        // console.log(data.results[0]);
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
      });
    });
  }

  // To handle when an event is clicked.
  const getEventInformation = (event) => {
    const { location } = event;
    const eventLocation = location.join(',');
    const userLocation = userPosition.join(',');
    // console.log(eventLocation);
  
    fetch(`https://api.radar.io/v1/route/distance?origin=${userLocation}&destination=${eventLocation}&modes=foot,car&units=imperial`, {
      headers: {
        // Header goes here
        Authorization: 'RADAR KEY GOES HERE'
      }
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
      })
    })
  }

  const handleLogOut = (event) => {
    event.preventDefault();

    authMethods.signOut();
  }

  useEffect(() => {
    getUserPosition();
    getNextEventPage();
  }, []);
  return (
      <Layout>
        {/*<Header>*/}
        {/*  HOME PAGE*/}
        {/*  Logged User: {userEmail}*/}
        {/*  <br/>*/}
        {/*  <Button variant="danger" type="button" onClick={handleLogOut}> Logout</Button>*/}
        {/*  <Button variant="primary" type="button" onClick={getNextEventPage}> NextPage</Button>*/}
        {/*</Header>*/}
        {/*<Layout>*/}
        {/*  <Sider>Sider</Sider>*/}
        {/*  <Content>*/}
        {/*    <b>{events.length}-{nextPage}</b>*/}
        {/*    {events.map((event, index) => {*/}
        {/*      const {id, title} = event;*/}

        {/*      return (*/}
        {/*          <button key={`${index}-${id}`} onClick={() => getEventInformation(event)}>{title}</button>*/}
        {/*      );*/}
        {/*    })}*/}
        {/*  </Content>*/}
        {/*</Layout>*/}
        {/*<Footer>Footer</Footer>*/}
        <HomepageWrapper></HomepageWrapper>
      </Layout>
  );
}

export default Homepage;