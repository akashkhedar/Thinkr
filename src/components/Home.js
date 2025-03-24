import Addnote from "./Addnote";
import Notes from "./Notes";

const Home = (props) => {
  return (
    <>
      <Addnote showAlert={props.showAlert} />
      <Notes showAlert={props.showAlert} />
    </>
  );
};

export default Home;
