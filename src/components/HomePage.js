import { Container } from "react-bootstrap";
import classes from './HomePage.module.css';

const HomePage = () => {
  return (
    <section className={classes.heading} >
      <Container>
        <h1>This is the home page</h1>
      </Container>
    </section>
  );
};

export default HomePage;
