import React, {useEffect, useState} from 'react';
import {authMethods} from '../firebase/auth';
import {Button, Layout} from 'antd';
import { Typography } from 'antd';
import { Card } from 'antd';
import { notification } from 'antd';

const {Header, Footer, Sider, Content} = Layout;
const { Title } = Typography;

const Homepage = () => {
  const [userPosition, setUserPosition] = useState([]);
  const [nextPage, setNextPage] = useState('https://api.predicthq.com/v1/events/?');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const getUserPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserPosition([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      }, () => {
        notification.error({
          message: 'Error',
          description: 'Geolocation is not active'
        });
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

    setSelectedEvent(event);
  
    fetch(`https://api.radar.io/v1/route/distance?origin=${userLocation}&destination=${eventLocation}&modes=foot,car&units=imperial`, {
      headers: {
        // Header goes here
        Authorization: 'RADAR KEY GOES HERE'
      }
    }).then((res) => {
      res.json().then((data) => {
        // console.log(data);
      })
    })
  }

  useEffect(() => {
    getUserPosition();
    getNextEventPage();
  }, []);

  let SEstartDate = '';
  let SEendDate = '';

  if (selectedEvent) {
    const start = new Date(selectedEvent.start);
    const end = new Date(selectedEvent.end);

    SEstartDate = start.toUTCString();
    SEendDate = end.toUTCString();

  }

  return (
    <div style={{display: 'flex'}}>
      <div className="events-container" style={{display: 'flex', flexDirection: 'column', width: '30%', height: '100%', maxHeight: '600px'}}>
        <Title level={3}>Events</Title>
          <div style={{overflowY: 'scroll'}}>
            {events.map((event, index) => {
              const {id, title, category, description } = event;
              const isSelected = selectedEvent && selectedEvent.id === id;

              return (
                  <Card className={isSelected ? 'selected-event' : ''}key={`${index}-${id}`} title={title} style={{ width: '90%', margin: '10px', cursor: 'pointer' }} onClick={() => getEventInformation(event)}>
                    <p>{description ? description : 'No Description provided'}</p>
                  </Card>
              );
            })}
          <Button variant="primary" type="button" onClick={getNextEventPage}>Load More</Button>
        </div>
      </div>
      <div className="event-info-container" style={{width: '70%'}}>
        <Title level={3}>Event Info</Title>
        {selectedEvent &&
          <div>
            <Title level={4}>{selectedEvent.title}</Title>
            <p>{selectedEvent.description ? selectedEvent.description : 'No Description provided'}</p>
            {SEstartDate} - {SEendDate}
          </div>
        }
        <div className="map-container">
          <img style={{width: '100%'}} src="https://miro.medium.com/max/4064/1*qYUvh-EtES8dtgKiBRiLsA.png" />
        </div>
      </div>
    </div>
  );
}

export default Homepage;