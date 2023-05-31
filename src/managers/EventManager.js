export const getEvents = () => {
  return fetch("http://localhost:8000/events", {
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  }).then((response) => response.json());
};

export const createEvent = (event) => {
  return fetch("http://localhost:8000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
    body: JSON.stringify(event),
  }).then((resp) => resp.json());
};

export const getSingleEvent = (pk) => {
  return fetch(`http://localhost:8000/events/${pk}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  }).then((response) => response.json());
};

export const updateEvent = (updatedEvnt) => {
  return fetch(`http://localhost:8000/events/${updatedEvnt.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
    body: JSON.stringify(updatedEvnt),
  });
};

export const deleteEvent = (eventId) => {
  return fetch(`http://localhost:8000/events/${eventId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  });
};
