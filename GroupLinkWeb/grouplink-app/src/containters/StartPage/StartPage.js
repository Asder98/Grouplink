import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, TextField, IconButton, Typography, Button, Grid, Container, CardHeader, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(20),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
    },
    card: {
      width: 500,
      borderRadius: 50,
      boxShadow: '0px 20px 40px #2699FB33',
      // opacity: 1
    },
    title: {
      marginTop: 80,
      marginBottom: 40,
      marginLeft: 95,
      color: '#7F7F7F'
    },
    subTitle: {
      marginLeft: 95,
      color: '#7F7F7F'
    },
    fieldText: {
      width: 250,
      marginLeft: 95,
      marginTop: 30,
      marginBottom: 70,
      fontSize: 12
    },
    findButton: {
      height: 40,
      marginLeft: 10,
      marginTop: 30,
      marginBottom: 70,
      borderRadius: 25
    }
  }));

const StartPage = ({match}) => {
    const classes = useStyles();
    console.log(match);
    
    return (
      <Container className={classes.root} maxWidth="xs">
        <Card className={classes.card}>
          <Typography variant="h4" className={classes.title}>
            Witaj!
          </Typography>
          <Typography variant="h6" className={classes.subTitle}>
            Zacznijmy poszukiwania!
          </Typography>
          <Typography variant="h6" className={classes.subTitle}>
            Skorzystaj z wyszukiwarki poniżej.
          </Typography>
          <TextField
                        variant="outlined"
                        size="small"
                        id="email"
                        label={<Typography variant="caption">
                          Wpisz kod kursu lub nazwę przedmiotu
                        </Typography>}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        className={classes.fieldText}
                    />
            <Button aria-label="search" variant="contained" color="primary" className={classes.findButton}>
              <SearchIcon />
          </Button>
        </Card>
      </Container>
    )
}

export default StartPage
