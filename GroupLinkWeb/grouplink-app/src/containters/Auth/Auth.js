import React from 'react'
import styles from './Auth.module.css';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import ArrowForward from '@material-ui/icons/ArrowForward';


const Auth = ({ match }) => {

    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(2, 0, 1),
            borderRadius: 25,
            height: 50
        },
        root: {
            "& .MuiOutlinedInput-root": {
                "& fieldset": {
                    borderRadius: 25
                },
            }
        },
    }));

    console.log(match)
    const classes = useStyles();
    const createAcc = false; // ustawienie czy log in czy create acc

    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5" color="primary">
                    {createAcc ? 'Utwórz nowe konto' : 'Zaloguj się'}

                </Typography>
                <form className={classes.form} noValidate>
                    {createAcc ?
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Nazwa"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        /> : null}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Hasło"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <Lock color="primary" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    {createAcc ?
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Potwierdź Hasło"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        /> : null}
                    {createAcc ?
                        <div>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Utwórz konto
                    </Button>
                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                color="primary"
                                className={classes.submit}
                            >
                                Zaloguj się
                    </Button>
                        </div>
                        :
                        <div>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Zaloguj
                    </Button>
                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                color="primary"
                                className={classes.submit}
                            >
                                Utwórz nowe konto
                    </Button>
                        </div>



                    }
                </form>
            </div>
        </Container>
    )
}

export default Auth
