import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Lock from "@material-ui/icons/Lock";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { logIn, logOut } from "../../store/actions/auth";
import { showLogIn, showSignIn } from "../../store/actions/sign";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import red from "@material-ui/core/colors/red";

const NewPosting = ({ match, location }) => {
  const history = useHistory();

  const token = useSelector((state) => state.auth.token);
  const idUser = useSelector((state) => state.auth.userId);

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


  const classes = useStyles();

  const validationSchemaCreateGroup = yup.object({
    title: yup.string("Podaj tytuł ogłoszenia").required("Tytuł jest wymagany"),
    content: yup
      .string("Podaj treść ogłoszenia")
      .max(255, "Maksymalnie 255 znaków"),
  });

  const formik = useFormik({
    initialValues: {
      title: location.state.type === "edit" ? location.state.details.title : "",
      content:
        location.state.type === "edit" ? location.state.details.content : "",
    },
    validationSchema: validationSchemaCreateGroup,
    onSubmit: (values) => {
      location.state.type === "edit"
        ? putPosting(values, location.state.details.idNotification, location.state.details.idCourse)
        : createPosting(values);
    },
  });

  const createPosting = (values) => {
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };
    const body = {
      idUser: idUser,
      idCourse: location.state.groupInfo.idCourse,
      title: values.title,
      content: values.content,
      amount: 0,
    };
    axios
      .post("http://localhost:8080/api/Notification", body, config)
      .then((res) => {
        history.push(`/group/${location.state.groupInfo.idCourse}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const putPosting = (values, idNotification, idCourse) => {
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };
    const body = {
      idNotification: idNotification,
      idUser: idUser,
      idCourse: idCourse,
      title: values.title,
      content: values.content,
      amount: 0,
    };

    axios
      .put("http://localhost:8080/api/Notification", body, config)
      .then((res) => {
        history.push("/mypostings");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePosting = () => {
    if (window.confirm("Czy na pewno chcesz usunąć to ogłoszenie?")) {
      const config = {
        headers: { Authorization: `bearer ${token}` },
      };
      axios
        .delete(
          `http://localhost:8080/api/Notification/${location.state.details.idNotification}`,
          config
        )
        .then((res) => {
          history.push(`/mypostings`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Wstrzymano!");
    }
  };

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" color="primary">
          Dodaj ogłoszenie
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
            id="title"
            name="title"
            label="Tytuł ogłoszenia"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            autoFocus
            classes={{
              root: classes.root,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            rows={9}
            id="content"
            name="content"
            label="Treść ogłoszenia"
            value={formik.values.content}
            onChange={formik.handleChange}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
            autoFocus
            classes={{
              root: classes.root,
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Opublikuj ogłoszenie
          </Button>
        </form>
        {location.state.type === "edit" ? (
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            className={classes.submit}
            onClick={() => deletePosting(11)}
          >
            Usuń ogłoszenie
          </Button>
        ) : null}
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          className={classes.submit}
          onClick={() => history.goBack()}
        >
          Anuluj
        </Button>
      </div>
    </Container>
  );
};

export default NewPosting;
