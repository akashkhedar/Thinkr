import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import NoteContext from "../context/notes/NoteContext";
import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const Noteitem = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const context = useContext(NoteContext);
  const { deleteNote, editNote } = context;

  const handleDelete = (e) => {
    e.preventDefault();
    deleteNote(note._id);
    props.showAlert("Noted Deleted", "danger");
  };

  const [eNote, seteNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    editNote(eNote.id, eNote.title, eNote.description, eNote.tag);
    props.showAlert("Note Updated!", "success");
  };

  const onChange = (e) => {
    seteNote({
      ...eNote,
      [e.target.name]: e.target.value,
    });
  };

  const { note } = props;
  return (
    <>
      <Card className="mb-3">
        <Card.Img
          variant="top"
          src="https://static.vecteezy.com/system/resources/previews/022/425/727/original/river-landscape-illustration-with-view-mountains-green-fields-trees-and-forest-surrounding-the-rivers-in-flat-cartoon-hand-drawn-templates-vector.jpg"
        />
        <Card.Body>
          <Card.Title>{note.title}</Card.Title>
          <Card.Text>{note.description}</Card.Text>
          <i className="fa-solid fa-trash-can mx-2" onClick={handleDelete}></i>
          <Button variant="primary">Open</Button>
          <i
            className="fa-solid fa-pen-to-square mx-2"
            onClick={() => {
              handleShow();
              seteNote({
                id: note._id,
                title: note.title,
                description: note.description,
                tag: note.tag,
                note,
              });
            }}
          ></i>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                value={eNote.title}
                onChange={onChange}
                minLength={3}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                id="description"
                name="description"
                value={eNote.description}
                onChange={onChange}
                minLength={3}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tag</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tag"
                id="tag"
                name="tag"
                value={eNote.tag}
                onChange={onChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              handleClose();
              handleSubmit(e);
            }}
            disabled={note.title.length < 3 || note.description.length < 5}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Noteitem;
