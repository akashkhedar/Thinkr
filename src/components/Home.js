import Addnote from "./Addnote";
import Header from "./Navbar";
import Notes from "./Notes";

const Home = (props) => {
  return (
    <>
      <Header />
      <Addnote />
      <Notes />
    </>
  );
};

export default Home;
