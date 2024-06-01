import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';

const EventCard = ({
  game,
  id,
  description,
  date,
  time,
  organizer,
}) => (
  <Card className="text-center">
    <Card.Header>{game?.title}</Card.Header>
    <Card.Body>
      <Card.Title>By: {organizer?.bio}</Card.Title>
      <Card.Text>{description}</Card.Text>
    </Card.Body>
    <Card.Footer className="text-muted">{date} / {time}</Card.Footer>
    <Link passHref href={`/events/${id}`}>
      <Button variant="success" className="">Edit</Button>
    </Link>
  </Card>
);

EventCard.propTypes = {
  game: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  organizer: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default EventCard;
