import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const [notes, setNotes] = useState([]);
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/show`, {
      method: "GET",
      headers: {
        authToken: localStorage.getItem("authToken"),
      },
    });
    const fetchedNotes = await response.json();
    setNotes(fetchedNotes);
  };

  const addNote = async (title, description, tag) => {
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
      body: JSON.stringify({
        title,
        description,
        tag,
      }),
    });
    const note = await response.json();
    setNotes((prevNotes) => prevNotes.concat(note));
  };

  const deleteNote = async (id) => {
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes((prevNotes) => newNotes);
  };

  const editNote = async (id, title, description, tag) => {
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
      body: JSON.stringify({
        title,
        description,
        tag,
      }),
    });
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }

    setNotes((prevNotes) => newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
