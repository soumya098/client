import React, { useState } from "react";
import {
  Paper,
  Grid,
  Avatar,
  Button,
  Container,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles";
import LockoutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "react-google-login";
import Icon from "./Icon";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUp, signIn } from "../../actions/actionCreators";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Auth() {
  const classes = useStyles();
  const [isSignup, setSignUp] = useState(false);
  const [sPass, setSPass] = useState(false);
  const [fData, setFData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const switchMode = () => {
    setSignUp(!isSignup);
    setSPass(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signUp(fData, history));
    } else {
      dispatch(signIn(fData, history));
    }
  };
  const handleChange = (e) => {
    setFData({ ...fData, [e.target.name]: e.target.value });
  };
  const showPassword = () => {
    setSPass(!sPass);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google sign in was unsuccessfull");
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockoutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "signup" : "sign in"} </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  lable="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  lable="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              type="email"
              lable="Email"
              handleChange={handleChange}
            />
            <Input
              name="password"
              type={sPass ? "text" : "password"}
              lable="Password"
              handleChange={handleChange}
              showPassword={showPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                lable="Repeat password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
          >
            {isSignup ? "Sign up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="494884876236-fdrgrrugbk15kvradtrb04dqm776824l.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                variant="contained"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
              >
                Sign in with Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an Account? Sign In"
                  : "Don't have an account? Sign Up "}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
