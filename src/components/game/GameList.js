import React, { useEffect, useState } from "react";
import { getGames, deleteGame } from "../../managers/GameManager.js";
import { useNavigate } from "react-router-dom";

export const GameList = (props) => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getGames().then((data) => setGames(data));
  }, []);

  const handleDelete = (gameId) => {
    deleteGame(gameId).then(() =>
      getGames().then((gamesArray) => setGames(gamesArray))
    );
  };

  return (
    <article className='games'>
      <button
        className='btn btn-2 btn-sep icon-create'
        onClick={() => {
          navigate({ pathname: "/games/new" });
        }}
      >
        Register New Game
      </button>
      {games.map((game) => {
        return (
          <section key={`game--${game.id}`} className='game'>
            <div className='game__info'>
              <div
                className='game__title'
                onClick={() =>
                  navigate({ pathname: `games/update/${game.id}` })
                }
              >
                {game.title}
              </div>{" "}
              by {game.maker}
            </div>
            <div className='game__players'>
              {game.number_of_players} players needed
            </div>
            <div className='game__skillLevel'>
              Skill level is {game.skill_level}
            </div>
            <button type='button' onClick={() => handleDelete(game.id)}>
              Delete
            </button>
          </section>
        );
      })}
    </article>
  );
};
