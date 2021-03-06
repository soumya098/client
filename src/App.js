import React from "react";
import { Container } from "@material-ui/core";
import NavBar from "./components/NavBar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import useStyles from "./styles";

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <Container maxWidth="lg" className={classes.container}>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Auth" exact component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
