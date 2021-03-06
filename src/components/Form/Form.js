import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { TextField, Button, Paper, Typography } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/actionCreators";

function Form({ currId, setCurrId }) {
  const classes = useStyles();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();
  const [enable, setEnable] = useState(true);
  const [formTitle, setFormTitle] = useState("Create");
  const post = useSelector((store) =>
    currId ? store.posts.find((p) => p._id === currId) : null
  );
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) {
      setPostData(post);
      setEnable(false);
      setFormTitle("Update");
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currId) {
      dispatch(updatePost(currId, { ...postData, name: user?.result?.name }));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clear();
  };

  const clear = () => {
    setCurrId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    setEnable(true);
    setFormTitle("Create");
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography align="center" variant="h6">
          Please sign in to create your own memories
        </Typography>
      </Paper>
    );
  } else {
    return (
      <Paper className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.form} ${classes.root}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">{formTitle} a Memory</Typography>
          <TextField
            label="Title"
            name="title"
            variant="outlined"
            fullWidth
            value={postData.title}
            onChange={(e) => {
              setPostData({ ...postData, title: e.target.value });
              setEnable(false);
            }}
          />
          <TextField
            label="Message"
            name="message"
            variant="outlined"
            fullWidth
            value={postData.message}
            onChange={(e) => {
              setPostData({ ...postData, message: e.target.value });
              setEnable(false);
            }}
          />
          <TextField
            label="Tags"
            name="tags"
            variant="outlined"
            fullWidth
            value={postData.tags}
            onChange={(e) => {
              setPostData({ ...postData, tags: e.target.value.split(",") });
              setEnable(false);
            }}
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                setPostData({ ...postData, selectedFile: base64 });
              }}
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
            disabled={enable}
          >
            submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            fullWidth
            onClick={clear}
          >
            Clear
          </Button>
        </form>
      </Paper>
    );
  }
}

export default Form;
