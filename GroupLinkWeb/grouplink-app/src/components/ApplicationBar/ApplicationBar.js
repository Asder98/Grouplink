import React from "react";
import styles from "./ApplicationBar.module.css";
import { AppBar, Toolbar, Typography, Button, Box } from "@material-ui/core";

const ApplicationBar = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" className={styles.title}>
          GroupLink
        </Typography>
        <Box mr={2}>
          <Button color="inherit" variant="outlined">
            <Typography variant="button">Zaloguj się</Typography>
          </Button>
        </Box>
        <Button color="inherit" variant="contained">
          <Typography variant="button" color="primary">
            Utwórz konto
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default ApplicationBar;
