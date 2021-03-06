import React, { useEffect, useState } from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { Container, Grid, Grow } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/actionCreators";
import useStyles from "./styles";

function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currId, setCurrId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currId, dispatch]);
  return (
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
  );
}

export default Home;
