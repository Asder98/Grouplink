import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Card, Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import styles from './Layout.module.css';

const useStyles = makeStyles((theme) => ({
  buttonsWrapper: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const isLoggedIn = false; // do ustawiania przyciskow w appbar
  return (
    <React.Fragment>
      <AppBar position="relative" >
        <Toolbar>
          <Typography variant="h6" className={styles.title}>
            GroupLink
            </Typography>
          {isLoggedIn ?
            <div className={classes.buttonsWrapper}>
              <Box mr={2}>
                <Button className={styles.signInButton} color="inherit" variant="outlined">
                  <Typography variant="button">
                    Twoje ogłoszenia
                  </Typography>
                </Button>
              </Box>
              <Button className={styles.signInButton} color="inherit" variant="outlined">
                Wyloguj się
            </Button>
            </div>
            :
            <div className={classes.buttonsWrapper}>
              <Box mr={2}>
                <Button className={styles.signInButton} color="inherit" variant="outlined">
                  Zaloguj się
              </Button>
              </Box>
              <Button className={styles.signUpButton} variant="contained">
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
