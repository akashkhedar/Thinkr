import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NoteContext from "../context/notes/NoteContext";
import { useState, useContext } from "react";

const Addnote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
    props.showAlert("Noted Added", "success");
  };

  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          id="title"
          name="title"
          onChange={onChange}
          minLength={3}
          value={note.title}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          id="description"
          name="description"
          onChange={onChange}
          minLength={5}
          value={note.description}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Tag</Form.Label>
        <Form.Control
          type="text"
          id="tag"
          name="tag"
          onChange={onChange}
          value={note.tag}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={handleSubmit}
        disabled={note.title.length < 3 || note.description.length < 5}
      >
        Submit
      </Button>
    </Form>
  );
};

export default Addnote;
