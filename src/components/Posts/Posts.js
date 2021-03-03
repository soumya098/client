import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

function Posts({ setCurrId }) {
  const classes = useStyles();
  const posts = useSelector((store) => store.posts);

  const renderPost = posts.map((post) => (
    <Grid item key={post._id} alignItems="center" xs={12} sm={6}>
      <Post post={post} setCurrId={setCurrId} />
    </Grid>
  ));
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid container justify="space-between" alignItems="stretch" spacing={5}>
      {renderPost}
    </Grid>
  );
}

export default Posts;
