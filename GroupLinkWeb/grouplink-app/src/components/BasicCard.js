import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EmailIcon from "@material-ui/icons/Email";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2, 0, 1),
    borderRadius: 25,
    height: 50,
    marginLeft: 5,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #fff",
    borderRadius: 25,
    boxShadow: theme.shadows[5],
    minWidth: "60%",
    maxWidth: "lg",
    padding: theme.spacing(2, 4, 3),
  },
}));

const BasicCard = ({ details }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const preventDefault = (event) => event.preventDefault();
  const mailto = `mailto:${details.email}`;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box m={1} display="flex" alignItems="center" flexDirection="row">
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" variant="body1">
                {details.login}
              </Typography>
              <Typography color="textPrimary" variant="h5">
                {details.title}
              </Typography>
              <Typography color="textPrimary" variant="caption">
                {details.content}
              </Typography>
            </Grid>
          </Grid>
          <Box
            sx={{
              pt: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box>
              <IconButton
                type="submit"
                className={classes.button}
                color="primary"
                variant="contained"
                onClick={handleOpen}
              >
                <EmailIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </CardContent>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography color="textSecondary" variant="body1">
              {details.login}
            </Typography>
            <Typography color="textPrimary" variant="h5">
              {details.title}
            </Typography>
            <Typography color="textPrimary" variant="caption">
              {details.content}
            </Typography>
            <Typography color="textPrimary" variant="body1">
              Kontakt:{" "}
              <Link href={mailto} onClick={preventDefault}>
                {details.email}
              </Link>
            </Typography>
          </div>
        </Fade>
      </Modal>
    </Card>
  );
};

export default BasicCard;
