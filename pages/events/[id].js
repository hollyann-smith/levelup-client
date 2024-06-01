import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import EventForm from '../../components/event/EventForm';
import { getSingleEvent } from '../../utils/data/eventData';

const UpdateEvent = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [event, setEvent] = useState({});

  useEffect(() => {
    getSingleEvent(id).then(setEvent);
  }, [id]);

  return (
    <div>
      <h2>Update Game</h2>
      <EventForm user={user} game={event.game} description={event.description} date={event.date} time={event.time} organizer={event.organizer} gameType={event.gameType} />
    </div>
  );
};

export default UpdateEvent;
