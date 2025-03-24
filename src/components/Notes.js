import { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

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
    <Container className="pt-3" fluid style={{ backgroundColor: "black" }}>
      <Row className="justify-content-center">
        {notes.length === 0 && "No Notes to display"}
        {notes &&
          notes.map((note) => {
            return (
              <Col xs={11} sm={8} md={6} lg={4} xl={3} xxl={2} key={note._id}>
                <Noteitem note={note} showAlert={props.showAlert} />
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default Notes;
