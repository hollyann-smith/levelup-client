import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Col,
  Row,
} from 'react-bootstrap';
import { createGame, getGameTypes, updateGame } from '../../utils/data/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: 0,
};

const GameForm = ({ user, obj }) => {
  const [gameTypes, setGameTypes] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();
  useEffect(() => {
    if (obj) setCurrentGame(obj);
  }, [obj]);

  useEffect(() => {
    // When the component mounts, fetch the game types and update the game types state
    getGameTypes().then(setGameTypes);
  }, []);

  const handleChange = (e) => {
    // TODO: Complete the onChange function
    const { name, value } = e.target;
    console.log('change', e.target);
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    // eslint-disable-next-line react/prop-types
    if (obj) {
      console.log('req', currentGame);
      const formData = {
        title: currentGame.title,
        maker: currentGame.maker,
        numberOfPlayers: Number(currentGame.number_of_players),
        skillLevel: Number(currentGame.skill_level),
        gameType: Number(currentGame.game_type.id),
      };
      updateGame(currentGame.id, formData).then(() => router.push('../../../games'));
    } else {
      const game = {
        id: currentGame.id,
        maker: currentGame.maker,
        title: currentGame.title,
        numberOfPlayers: Number(currentGame.numberOfPlayers),
        skillLevel: Number(currentGame.skillLevel),
        gameType: Number(currentGame.gameTypeId),
        userId: user.uid,
      };
      console.warn('req', game);
      console.warn('gameTypes', gameTypes);
      // Send POST request to your API
      createGame(game).then(() => router.push('/games'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1 className="text-white mt-5">{obj ? 'Update' : 'Create'} Game</h1>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={currentGame.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {/* TODO: create the rest of the input fields */}
        <Form.Group className="mb-3">
          <Form.Label>Maker</Form.Label>
          <Form.Control type="text" name="maker" required value={currentGame.maker} onChange={handleChange} />
        </Form.Group>
        <Row>
          <Col>
            <Form.Label>Number of Players</Form.Label>
            <Form.Control name="numberOfPlayers" required value={currentGame.number_of_players} onChange={handleChange} />
          </Col>

          <Col>
            <Form.Label>Skill Level</Form.Label>
            <Form.Control name="skillLevel" required value={currentGame.skill_level} onChange={handleChange} />
          </Col>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Game Type</Form.Label>
            <Form.Select defaultValue={currentGame.game_type?.id} name="gameTypeId" onChange={handleChange}>
              <option value="">Choose...</option>

              {
                gameTypes.map((type) => (
                  <option
                    key={type.id}
                    value={type.id}
                    selected={currentGame.game_type?.id === type.id}
                  >
                    {type.label}
                  </option>
                ))
              }

            </Form.Select>
          </Form.Group>
        </Row>

        <br />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  obj: PropTypes.shape({
    id: PropTypes.number,
    skillLevel: PropTypes.number,
    numberOfPlayers: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    gameType: PropTypes.number,
  }).isRequired,
};

export default GameForm;
