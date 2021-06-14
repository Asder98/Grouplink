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

const NewGroup = ({ match, location }) => {
  const history = useHistory();

  const token = useSelector((state) => state.auth.token);
  const idUser = useSelector(state => state.auth.userId);
  const userLogin = useSelector(state => state.auth.login);

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
    courseCode: yup
      .string("Podaj kod kursu")
      // .email("Podaj poprawny email")
      .required("Kod kursu jest wymagany"),
    groupCode: yup
      .string("Podaj kod grupy")
      // .email("Podaj poprawny email")
      .required("Kod grupy jest wymagany"),
    courseName: yup
      .string("Podaj nazwę kursu")
      // .email("Podaj poprawny email")
      .required("Nazwa kursu jest wymagana"),
    dayOfTheWeek: yup
      .string("Podaj dzień tygodnia")
      .required("Dzień tygodnia jest wymagany"),
    // .matches(/^(?!\s*$).+/, "Dzień tygodnia jest wymagany"),
    startTime: yup
      .string("Podaj godzinę początkową")
      .required("Czas jest wymagany")
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format GG:MM"),
    endTime: yup
      .string("Podaj godzinę końcową")
      .required("Czas jest wymagany")
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format GG:MM"),
    groupMixingType: yup
      .string("Podaj parzystość")
      .required("Parzystość jest wymagana"),
    lecturerName: yup
      .string("Podaj imię prowadzącego")
      // .email("Podaj poprawny email")
      .required("Dane prowadzącego są wymagane"),
    lecturerSurname: yup
      .string("Podaj nazwisko prowadzącego")
      // .email("Podaj poprawny email")
      .required("Dane prowadzącego są wymagane"),
  });

  const formik = useFormik({
    initialValues: {
      courseCode: "",
      groupCode: "",
      courseName: "",
      dayOfTheWeek: "",
      startTime: "",
      endTime: "",
      groupMixingType: "",
      lecturerName: "",
      lecturerSurname: "",
    },
    validationSchema: validationSchemaCreateGroup,
    onSubmit: (values) => {
      const config = {
        headers: { Authorization: `bearer ${token}` },
      };
      const body = {
        "userLogin": userLogin,
        "idCourse": 0,
        "courseName": values.courseName,
        "groupCode": values.groupCode,
        "courseCode": values.courseCode,
        "groupMixingType": values.groupMixingType,
        "dayOfTheWeek": values.dayOfTheWeek,
        "startTime": values.startTime,
        "endTime": values.endTime,
        "type": "aaa",
        "lecturerName": values.lecturerName,
        "lecturerSurname": values.lecturerSurname,
        "lecturerEmail": "string"
      };
      axios
        .post("http://localhost:8080/api/Course/CreateNewCourse", body, config)
        .then((res) => {
          history.push(`/`);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" color="primary">
          Dodaj grupę
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
            id="courseCode"
            name="courseCode"
            label="Kod kursu"
            value={formik.values.courseCode}
            onChange={formik.handleChange}
            error={
              formik.touched.courseCode && Boolean(formik.errors.courseCode)
            }
            helperText={formik.touched.courseCode && formik.errors.courseCode}
            autoFocus
            classes={{
              root: classes.root,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="groupCode"
            name="groupCode"
            label="Kod grupy"
            value={formik.values.groupCode}
            onChange={formik.handleChange}
            error={formik.touched.groupCode && Boolean(formik.errors.groupCode)}
            helperText={formik.touched.groupCode && formik.errors.groupCode}
            autoFocus
            classes={{
              root: classes.root,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="courseName"
            name="courseName"
            label="Nazwa kursu"
            value={formik.values.courseName}
            onChange={formik.handleChange}
            error={
              formik.touched.courseName && Boolean(formik.errors.courseName)
            }
            helperText={formik.touched.courseName && formik.errors.courseName}
            autoFocus
            classes={{
              root: classes.root,
            }}
          />
          <FormControl fullWidth variant="outlined" className={classes.submit}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Dzień tygodnia
            </InputLabel>
            <Select
              native
              value={formik.values.dayOfTheWeek}
              onChange={formik.handleChange}
              error={
                formik.touched.dayOfTheWeek &&
                Boolean(formik.errors.dayOfTheWeek)
              }
              label="Dzień tygodnia"
              inputProps={{
                name: "dayOfTheWeek",
                id: "dayOfTheWeek",
              }}
            >
              <option value={""} />
              <option value={"Poniedziałek"}>Poniedziałek</option>
              <option value={"Wtorek"}>Wtorek</option>
              <option value={"Środa"}>Środa</option>
              <option value={"Czwartek"}>Czwartek</option>
              <option value={"Piątek"}>Piątek</option>
            </Select>
            <FormHelperText
              error={
                formik.touched.dayOfTheWeek &&
                Boolean(formik.errors.dayOfTheWeek)
              }
            >
              {formik.touched.dayOfTheWeek && formik.errors.dayOfTheWeek}
            </FormHelperText>
          </FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="startTime"
            name="startTime"
            label="Godzina rozpoczęcia"
            value={formik.values.startTime}
            onChange={formik.handleChange}
            error={formik.touched.startTime && Boolean(formik.errors.startTime)}
            helperText={formik.touched.startTime && formik.errors.startTime}
            autoFocus
            classes={{
              root: classes.root,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="endTime"
            name="endTime"
            label="Godzina zakończenia"
            value={formik.values.endTime}
            onChange={formik.handleChange}
            error={formik.touched.endTime && Boolean(formik.errors.endTime)}
            helperText={formik.touched.endTime && formik.errors.endTime}
            autoFocus
            classes={{
              root: classes.root,
            }}
          />
          <FormControl fullWidth variant="outlined" className={classes.submit}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Parzystość
            </InputLabel>
            <Select
              native
              value={formik.values.groupMixingType}
              onChange={formik.handleChange}
              error={
                formik.touched.groupMixingType &&
                Boolean(formik.errors.groupMixingType)
              }
              label="Dzień tygodnia"
              inputProps={{
                name: "groupMixingType",
                id: "groupMixingType",
              }}
            >
              <option value={""} />
              <option value={"TPN"}>Tydzień parzysty i nieparzysty</option>
              <option value={"TP"}>Tydzień parzysty</option>
              <option value={"TN"}>Tydzień nieparzysty</option>
            </Select>
            <FormHelperText
              error={
                formik.touched.groupMixingType &&
                Boolean(formik.errors.groupMixingType)
              }
            >
              {formik.touched.groupMixingType && formik.errors.groupMixingType}
            </FormHelperText>
          </FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="lecturerName"
            name="lecturerName"
            label="Imię prowadzącego"
            value={formik.values.lecturerName}
            onChange={formik.handleChange}
            error={
              formik.touched.lecturerName && Boolean(formik.errors.lecturerName)
            }
            helperText={
              formik.touched.lecturerName && formik.errors.lecturerName
            }
            autoFocus
            classes={{
              root: classes.root,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="lecturerSurname"
            name="lecturerSurname"
            label="Nazwisko prowadzącego"
            value={formik.values.lecturerSurname}
            onChange={formik.handleChange}
            error={
              formik.touched.lecturerSurname &&
              Boolean(formik.errors.lecturerSurname)
            }
            helperText={
              formik.touched.lecturerSurname && formik.errors.lecturerSurname
            }
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
            Utwórz grupę
          </Button>
        </form>
        <Button
          onClick={() => history.goBack()}
          type=""
          fullWidth
          variant="outlined"
          color="primary"
          className={classes.submit}
        >
          Anuluj
        </Button>
      </div>
    </Container>
  );
};

export default NewGroup;
