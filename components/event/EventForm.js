import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvent } from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';

const initialState = {
  time: '00:00:00',
  description: '',
  game: '',
  organizer: '',
  date: '00:00:00',
};

const EventForm = ({
  user,
  id,
  game,
  description,
  date,
  time,
}) => {
  const [games, setGames] = useState([]);
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  // TODO: Get the game types, then set the state
  useEffect(() => {
    if (id) {
      setFormInput({
        game,
        description,
        date,
        time,
      });
    }
    getGames().then((data) => setGames(data));
  }, [date, description, game, id, time]);

  const handleChange = (e) => {
    // TODO: Complete the onChange function
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    const event = {
      game: Number(formInput.game),
      description: formInput.description,
      date: formInput.date,
      time: formInput.time,
      organizer: user.uid,
    };

    // Send POST request to your API
    createEvent(event).then(() => router.push('/events'));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" required value={formInput.description} onChange={handleChange} />
          <Form.Label>Date</Form.Label>
          <Form.Control name="date" required value={formInput.date} onChange={handleChange} />
          <Form.Label>Time</Form.Label>
          <Form.Control name="time" required value={formInput.time} onChange={handleChange} />
        </Form.Group>

        {/* TODO: create the rest of the input fields */}

        <Form.Label>Event Game</Form.Label>
        <Form.Select
          aria-label="game"
          name="game"
          onChange={handleChange}
          className="mb-3"
          value={formInput.game}
          required
        >
          <option value="">Select Game</option>
          {
            games.map((gameName) => (
              <option
                key={gameName.id}
                value={gameName.id}
              >
                {gameName.title}
              </option>
            ))
          }
        </Form.Select>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number,
  game: PropTypes.number,
  description: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
};
EventForm.defaultProps = {
  id: null,
  time: '00:00:00',
  description: '',
  game: '',
  date: '00:00:00',
};

export default EventForm;
