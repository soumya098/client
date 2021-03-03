import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { Container, AppBar, Typography, Grid, Grow } from "@material-ui/core";
import memories from "./images/memories.png";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/actionCreators";

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currId, setCurrId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currId, dispatch]);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h3" className={classes.heading}>
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="55"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            className={classes.mainContainer}
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrId={setCurrId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currId={currId} setCurrId={setCurrId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
