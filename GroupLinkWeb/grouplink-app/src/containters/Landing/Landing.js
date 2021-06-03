import React from 'react'
import styles from './Landing.module.css';
import { AppBar, Toolbar, Typography, Button, Container, Card, Box, Paper } from '@material-ui/core';
import {useHistory} from 'react-router-dom'

const StartPage = ({match}) => {
    // console.log(match);
    let history = useHistory();
    return (
        <div>
        <Box display="flex" alignItems="center" flexWrap="nowrap" justifyContent="space-between" className={styles.cardWrapper}>
          <div className={styles.graph}>
            <div className={styles.innerGraph}/>
            <div className={styles.innerGraph2}/>
          </div>
          <Paper elevation={0} className={styles.paper}>
            <Box  flexDirection="column" display="flex" justifyContent="space-beetwen">

            <Typography variant="h4" color="primary">
                Kolejny projekt grupowy?
            </Typography>
            <Typography variant="body2" color="primary" mt={1}>
                Skorzystaj z naszej platformy! Znajdziesz tutaj osoby, które również szukają partnerów do projektu!
            </Typography>
            <Box display="flex" flexDirection="row" mt={1}>
              <Box mr={2} >
                <Button onClick={() => history.push('/login')} className={styles.signInButton} color="secondary" variant="outlined">
                    <Typography variant="button" color="primary">
                        Zaloguj się
                    </Typography>
                </Button>
              </Box>
              <Button onClick={() => history.push('/register')} className={styles.signUpButton} color="primary" variant="contained">
                  <Typography variant="button" color="inherit">
                      Utwórz konto
                  </Typography>
              </Button>
            </Box>
            </Box>
          </Paper>
        </Box>
      </div>
    )
}

export default StartPage
