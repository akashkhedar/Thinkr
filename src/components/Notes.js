import { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import "../stylesheets/Notes.css"

const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const { notes, getNotes } = context;

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Container className="notes-container" fluid>
      <h3 className="notes-title">Your Notes</h3>
      <Row className="notes-row px-3">
        {notes.length === 0 && <p className="no-notes">No notes to display</p>}
        {notes &&
          notes.map((note) => (
            <Col
              xs={11}
              sm={6}
              md={4}
              lg={3}
              xl={3}
              key={note._id}
              className="d-flex"
            >
              <Noteitem note={note} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Notes;
