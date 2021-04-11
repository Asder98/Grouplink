import React from 'react'
import styles from './Landing.module.css';
import { AppBar, Toolbar, Typography, Button, Container, Card, Box, Paper } from '@material-ui/core';

const StartPage = ({match}) => {
    console.log(match);
    
    return (
        <div>
        <AppBar position="relative" >
          <Toolbar>
            <Typography variant="h6" className={styles.title}>
              GroupLink
            </Typography>
            <Box mr={2}>
              <Button className={styles.signInButton} color="inherit" variant="outlined">
                  <Typography variant="button">
                      Zaloguj się
                  </Typography>
              </Button>
            </Box>
            <Button className={styles.signUpButton} color="inherit" variant="contained">
                <Typography variant="button" color="primary">
                    Utwórz konto
                </Typography>
            </Button>
            
          </Toolbar>
        </AppBar>
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
                <Button className={styles.signInButton} color="primary" variant="outlined">
                    <Typography variant="button">
                        Zaloguj się
                    </Typography>
                </Button>
              </Box>
              <Button className={styles.signUpButton} color="primary" variant="contained">
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
