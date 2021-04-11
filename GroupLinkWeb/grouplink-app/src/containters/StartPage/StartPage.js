import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
        margin: 0
    },
    signInButton: {
        marginRight: theme.spacing(2),
        width: 160,
        height: 38
    },
    signUpButton: {
        width: 160,
        height: 38
    }
  }));

const StartPage = ({match}) => {
    const classes = useStyles();
    console.log(match);
    
    return (
        <div className={classes.root}>
        <AppBar position="absolute" >
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              GroupLink
            </Typography>
            <div>
            <Button className={classes.signInButton} color="inherit" variant="outlined" m={12}>
                <Typography variant="button">
                    Zaloguj się
                </Typography>
            </Button>
            <Button className={classes.signUpButton} color="inherit" variant="contained">
                <Typography variant="button" color="primary">
                    Utwórz konto
                </Typography>
            </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
}

export default StartPage
