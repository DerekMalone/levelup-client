import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGames } from "../../managers/GameManager";
import { createEvent, getSingleEvent } from "../../managers/EventManager";

export const UpdateEventForm = () => {
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({
    description: "",
    date: "",
    time: "",
    gameId: 0,
    game: {},
  });
  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (eventId) {
      getSingleEvent(eventId).then((evnt) => setCurrentEvent(evnt));
      getGames().then((games) => setGames(games));
    }
  }, []);

  const changeEventState = (domEvent) => {
    const { name, value } = domEvent.target;
    setCurrentEvent((preState) => ({
      ...preState,
      [name]: value,
    }));
  };
  return (
    <form className='eventForm'>
      <h2 className='eventForm__title'>Update Event</h2>
      <fieldset>
        <div className='form-group'>
          <label htmlFor='title'>Description: </label>
          <input
            type='text'
            name='description'
            required
            autoFocus
            className='form-control'
            value={currentEvent.description}
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className='form-group'>
          <label htmlFor='skillLevel'>Date:</label>
          <input
            type='date'
            name='date'
            required
            autoFocus
            className='form-control'
            value={currentEvent.date}
            onChange={changeEventState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className='form-group'>
          <label htmlFor='numberOfPlayers'>Time:</label>
          <input
            type='time'
            name='time'
            required
            autoFocus
            className='form-control'
            value={currentEvent.time}
            onChange={changeEventState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className='form-group'>
          <label htmlFor='gameChoice'>Choose a Game:</label>
          <select name='gameId' onChange={changeEventState}>
            <option value={currentEvent.gameId}>
              {currentEvent.game.title}
            </option>
            {games.map((game) => (
              <option key={game.id} value={game.id}>
                {game.title}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <button
        type='submit'
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();

          const newEvent = {
            description: currentEvent.description,
            date: currentEvent.date,
            time: currentEvent.time,
            game: parseInt(currentEvent.gameId),
          };

          // Send POST request to your API
          createEvent(newEvent).then(() => navigate("/events"));
        }}
        className='btn btn-primary'
      >
        Create
      </button>
    </form>
  );
};
