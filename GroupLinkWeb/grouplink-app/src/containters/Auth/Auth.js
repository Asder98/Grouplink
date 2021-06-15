import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Lock from "@material-ui/icons/Lock";
import { logIn } from "../../store/actions/auth";
import { showLogIn, showSignIn } from "../../store/actions/sign";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Auth = ({ match }) => {
  const isSignIn = useSelector((state) => state.sign);
  const dispatch = useDispatch();
  let history = useHistory();

  const onClickLogIn = () => {
    dispatch(showLogIn());
    history.push("/login");
  };
  const onClickSignIn = () => {
    dispatch(showSignIn());
    history.push("/register");
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(2, 0, 1),
      borderRadius: 25,
      height: 50,
    },
    root: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderRadius: 25,
        },
      },
    },
  }));

  const register = ({ login, email, password, confirmPassword }) => {
    const body = {
      login,
      email,
      password,
      confirmPassword,
    };
    axios
      .post("http://localhost:8080/api/User/register", body)
      .then((res) => {
        authenticate({ login, password });
        history.push("/");
      })
      .catch((err) => {
        const ErrorMessage = `Błędne dane konta: ${err.response.data.message}`
        alert(`Błędne dane konta: ${err.response.data.message}`);
      });
  };

  const authenticate = ({ login, password }) => {
    const body = {
      login,
      password,
    };
    axios
      .post("http://localhost:8080/api/User/authenticate", body)
      .then((res) => {
        dispatch(logIn(res.data.token, res.data.login, res.data.idUser));
        history.push("/");
      })
      .catch((err) => {
        alert("Błędne dane logowania");
      });
  };

  const classes = useStyles();
  // const createAcc = false; // ustawienie czy log in czy create acc

  const validationSchemaLogIn = yup.object({
    name: yup
      .string("Podaj swoją nazwę")
      .min(4, "Nazwa powinna zawierać minimum 4 znaki")
      .required("Nazwa jest wymagana"),
    password: yup
      .string("Podaj swoje hasło")
      .min(8, "Hasło powinno zawierać minimum 8 znaków")
      .required("Hasło jest wymagane"),
  });

  const validationSchemaSignUp = yup.object({
    email: yup
      .string("Podaj swój email")
      .email("Podaj poprawny email")
      .required("Email jest wymagany"),
    name: yup
      .string("Podaj swoją nazwę")
      .min(4, "Nazwa powinna zawierać minimum 4 znaki")
      .required("Nazwa jest wymagana"),
    password: yup
      .string("Podaj swoje hasło")
      .min(8, "Hasło powinno zawierać minimum 8 znaków")
      .required("Hasło jest wymagane"),
    password2: yup
      .string("Potwierdź swoje hasło")
      .oneOf([yup.ref("password"), null], "Hasło musi być takie samo")
      .required("Potwierdzenie hasła jest wymagane"),
  });

  const formik = useFormik({
    initialValues: {
      login: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: isSignIn ? validationSchemaSignUp : validationSchemaLogIn,
    onSubmit: (values) => {
      if (isSignIn) {
        register({
          login: formik.values.name,
          email: formik.values.email,
          password: formik.values.password,
          confirmPassword: formik.values.password2,
        });
      } else {
        authenticate({
          login: formik.values.name,
          password: formik.values.password,
        });
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" color="primary">
          {isSignIn ? "Utwórz nowe konto" : "Zaloguj się"}
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Nazwa"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            autoFocus
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <AccountCircle color="primary" />
                </InputAdornment>
              ),
            }}
          />
          {isSignIn ? (
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              autoFocus
              classes={{
                root: classes.root,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          ) : null}

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Hasło"
            type="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Lock color="primary" />
                </InputAdornment>
              ),
            }}
          />
          {isSignIn ? (
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password2"
              label="Potwierdź Hasło"
              type="password"
              id="password2"
              value={formik.values.password2}
              onChange={formik.handleChange}
              error={
                formik.touched.password2 && Boolean(formik.errors.password2)
              }
              helperText={formik.touched.password2 && formik.errors.password2}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          ) : null}
          {isSignIn ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Utwórz konto
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Zaloguj
            </Button>
          )}
        </form>
        {isSignIn ? (
          <Button
            onClick={() => onClickLogIn()}
            type=""
            fullWidth
            variant="outlined"
            color="primary"
            className={classes.submit}
          >
            Zaloguj się
          </Button>
        ) : (
          <Button
            onClick={() => onClickSignIn()}
            type=""
            fullWidth
            variant="outlined"
            color="primary"
            className={classes.submit}
          >
            Utwórz nowe konto
          </Button>
        )}
      </div>
    </Container>
  );
};

export default Auth;
