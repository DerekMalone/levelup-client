import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleGame,
  updateGame,
  getGameTypes,
} from "../../managers/GameManager.js";

export const UpdateGameForm = () => {
  const navigate = useNavigate();
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState({
    skillLevel: 0,
    numberOfPlayers: 0,
    title: "",
    maker: "",
    gameTypeId: 0,
    gameType: {},
  });
  const { gameId } = useParams();

  useEffect(() => {
    if (gameId) {
      getSingleGame(gameId).then((game) =>
        setCurrentGame({
          id: game.id,
          skillLevel: game.skill_level,
          numberOfPlayers: game.number_of_players,
          title: game.title,
          maker: game.maker,
          gameTypeId: game.game_type.id,
          gameType: game.game_type,
        })
      );
      getGameTypes().then((response) => setGameTypes(response));
    }
  }, []);

  const changeGameState = (domEvent) => {
    const { name, value } = domEvent.target;
    setCurrentGame((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  return (
    <form className='gameForm'>
      <h2 className='gameForm__title'>Register New Game</h2>
      <fieldset>
        <div className='form-group'>
          <label htmlFor='title'>Title: </label>
          <input
            type='text'
            name='title'
            required
            autoFocus
            className='form-control'
            value={currentGame.title}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className='form-group'>
          <label htmlFor='skillLevel'>Skill Level:</label>
          <input
            type='number'
            name='skillLevel'
            required
            autoFocus
            className='form-control'
            value={currentGame.skillLevel}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className='form-group'>
          <label htmlFor='numberOfPlayers'>Number of Players:</label>
          <input
            type='number'
            name='numberOfPlayers'
            required
            autoFocus
            className='form-control'
            value={currentGame.numberOfPlayers}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className='form-group'>
          <label htmlFor='maker'>Maker:</label>
          <input
            type='text'
            name='maker'
            required
            autoFocus
            className='form-control'
            value={currentGame.maker}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className='form-group'>
          <label htmlFor='gameType'>Choose a Game Type:</label>
          <select name='gameTypeId' onChange={changeGameState}>
            <option value={currentGame.gameTypeId}>
              {currentGame.gameType.label}
            </option>
            {gameTypes.map((gameType) => (
              <option key={gameType.id} value={gameType.id}>
                {gameType.label}
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

          const updatedGame = {
            id: gameId,
            maker: currentGame.maker,
            title: currentGame.title,
            number_of_players: parseInt(currentGame.numberOfPlayers),
            skill_level: parseInt(currentGame.skillLevel),
            game_type: parseInt(currentGame.gameTypeId),
          };

          // Send POST request to your API
          updateGame(updatedGame).then(() => navigate("/"));
        }}
        className='btn btn-primary'
      >
        Update Game
      </button>
    </form>
  );
};
