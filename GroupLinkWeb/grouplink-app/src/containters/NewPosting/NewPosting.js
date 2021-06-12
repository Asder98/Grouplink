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
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const NewPosting = ({ match }) => {

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

    // console.log(match)
    const classes = useStyles();

    const validationSchemaCreateGroup = yup.object({
        title: yup
            .string("Podaj tytuł ogłoszenia")
            .required("Tytuł jest wymagany"),
        amount: yup
            .number("Ilość osób wymagana")
            .min(1, "Min 1 osoba")
            .required("Ilość osób wymagana"),
        content: yup
            .string("Podaj treść ogłoszenia")
            .max(255, "Maksymalnie 255 znaków")
    });

    const formik = useFormik({
        initialValues: {
            amount: "",
            title: "",
            content: "",
        },
        validationSchema: validationSchemaCreateGroup,
        onSubmit: (values) => {
            console.log(values);
        },
    });

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
                        id="amount"
                        name="amount"
                        label="Ilość osób"
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        error={formik.touched.amount && Boolean(formik.errors.amount)}
                        helperText={formik.touched.amount && formik.errors.amount}
                        autoFocus
                        classes={{
                            root: classes.root,
                        }}
                    />
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
                <Button
                    onClick={formik.handleReset}
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
}

export default NewPosting
