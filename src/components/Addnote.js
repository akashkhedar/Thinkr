import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NoteContext from "../context/notes/NoteContext";
import { useState, useContext } from "react";
import "../stylesheets/Addnote.css"; // ✅ Import the CSS file

const Addnote = () => {
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
    setNote({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <Form className="addnote-form" onSubmit={handleSubmit}>
      <h4 className="form-title">📝 Create a New Note</h4>

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          onChange={onChange}
          minLength={3}
          value={note.title}
          required
          placeholder="Enter note title"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          rows={3}
          onChange={onChange}
          minLength={5}
          value={note.description}
          required
          placeholder="Enter note description"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Tag</Form.Label>
        <Form.Control
          type="text"
          name="tag"
          onChange={onChange}
          value={note.tag}
          placeholder="Optional tag"
        />
      </Form.Group>

      <div className="text-center">
        <Button
          variant="primary"
          type="submit"
          disabled={note.title.length < 3 || note.description.length < 5}
        >
          Add Note
        </Button>
      </div>
    </Form>
  );
};

export default Addnote;
