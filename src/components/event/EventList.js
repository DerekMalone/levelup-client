import React, { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../../managers/EventManager.js";
import { useNavigate } from "react-router-dom";

export const EventList = (props) => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  const handleDelete = (eventId) => {
    deleteEvent(eventId).then(() =>
      getEvents().then((eventArray) => setEvents(eventArray))
    );
  };

  return (
    <article className='events'>
      <button
        className='btn btn-2 btn-sep icon-create'
        onClick={() => {
          navigate({ pathname: "/events/new" });
        }}
      >
        Register New Event
      </button>
      {events.map((event) => {
        return (
          <section key={`event--${event.id}`} className='event'>
            <div className='event__title'>
              <div
                className='event__description'
                onClick={() =>
                  navigate({ pathname: `/events/update/${event.id}` })
                }
              >
                {" "}
                {event.description}{" "}
              </div>{" "}
              by {event.organizer.full_name}
            </div>
            <div className='event__players'>
              {event.game.number_of_players} players needed
            </div>
            <div className='event__skillLevel'>
              Skill level is {event.game.skill_level}
            </div>
            <button type='button' onClick={() => handleDelete(event.id)}>
              Delete
            </button>
          </section>
        );
      })}
    </article>
  );
};
