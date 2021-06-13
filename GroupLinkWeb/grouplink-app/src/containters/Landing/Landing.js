import React from "react";
import styles from "./Landing.module.css";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  Box,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {useSelector, useDispatch} from 'react-redux'
import { useHistory } from "react-router-dom";

import { showLogIn, showSignIn } from '../../store/actions/sign';

const StartPage = ({ match }) => {
  // console.log(match);
  let history = useHistory();
  const dispatch = useDispatch();

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(2, 0, 1),
      borderRadius: 25,
      height: 50,
      maxWidth: 200,
      minWidth: 200,
      marginLeft: 5,
    },
  }));

  const classes = useStyles();

  const onClickLogIn = () => {
    dispatch(showLogIn())
    history.push('/login');  
  }
  const onClickSignIn = () => {
    dispatch(showSignIn())
    history.push('/register');  
  }
  


  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        flexWrap="nowrap"
        justifyContent="space-between"
        className={styles.cardWrapper}
      >
        <Paper elevation={0} className={styles.paper}>
          <Box
            flexDirection="column"
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Typography variant="h4" color="primary">
              Kolejny projekt grupowy?
            </Typography>
            <Typography variant="body" color="primary">
              Skorzystaj z naszej platformy! Znajdziesz tutaj osoby, które
              również szukają partnerów do projektu!
            </Typography>
            <Box display="flex" flexDirection="row" mt={1}>
              <Box mr={2}>
                <Button
                  onClick={() => onClickLogIn()}
                  type="submit"
                  fullWidth
                  className={classes.button}
                  color="secondary"
                  variant="outlined"
                >
                  <Typography variant="button" color="primary">
                    Zaloguj się
                  </Typography>
                </Button>
              </Box>
              <Button
                onClick={() => onClickSignIn()}
                type="submit"
                fullWidth
                className={classes.button}
                color="primary"
                variant="contained"
              >
                <Typography variant="button" color="inherit">
                  Utwórz konto
                </Typography>
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default StartPage;
