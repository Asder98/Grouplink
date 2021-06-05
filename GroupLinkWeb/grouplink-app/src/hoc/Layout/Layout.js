import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Card, Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { logIn, logOut } from '../../store/actions/auth';
import { showLogIn, showSignIn } from '../../store/actions/sign';
import {useSelector, useDispatch} from 'react-redux'
import styles from './Layout.module.css';
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  buttonsWrapper: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

const Layout = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  
  const classes = useStyles();
  let history = useHistory();

  const onClickLogIn = () => {
    dispatch(showLogIn())
    history.push('/login');  
  }
  const onClickSignIn = () => {
    dispatch(showSignIn())
    history.push('/register');  
  }

  // const isLoggedIn = false; // do ustawiania przyciskow w appbar
  return (
    <React.Fragment>
      <AppBar position="relative" >
        <Toolbar>
          <Typography onClick={() => history.push('/')} variant="h6" className={styles.title}>
            GroupLink
            </Typography>
          {isAuth ?
            <div className={classes.buttonsWrapper}>
              <Box mr={2}>
                <Button className={styles.signInButton} color="inherit" variant="outlined">
                  <Typography variant="button">
                    Twoje ogłoszenia
                  </Typography>
                </Button>
              </Box>
              <Button onClick={() => dispatch(logOut())} className={styles.signInButton} color="inherit" variant="outlined">
                Wyloguj się
            </Button>
            </div>
            :
            <div className={classes.buttonsWrapper}>
              <Box mr={2}>
                <Button onClick={() => onClickLogIn()} className={styles.signInButton} color="inherit" variant="outlined">
                  Zaloguj się
              </Button>
              </Box>
              <Button onClick={() => onClickSignIn()} className={styles.signUpButton} variant="contained">
                <Typography variant="button" color="primary">
                  Utwórz konto
                </Typography>
              </Button>
            </div>
          }
        </Toolbar>
      </AppBar>
      <main className={styles.Content}>{children}</main>
    </React.Fragment>
  );
};

export default Layout;
