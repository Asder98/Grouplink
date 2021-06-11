import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";

const MainCard = (props) => {
  const useStyles = makeStyles((theme) => ({
    Card: {
      height: "100%",
    },
    Paper: {
      backgroundColor: fade(theme.palette.primary.main, 0.2),
    },
    root: {
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderRadius: 25
            },
        }
    },
}));

const classes = useStyles();

  return (
    <Card
      className={classes.Card}
    >
      <Paper elevation={1} className={classes.Paper}>
        <CardContent>
          <Box m={1} display="flex" alignItems="center" flexDirection="row">
            <Grid
              container
              spacing={3}
              sx={{ justifyContent: "space-between" }}
            >
              <Grid item>
                <Typography color="textSecondary" variant="body1">
                  G12-14b
                </Typography>
                <Typography color="textPrimary" variant="h5">
                  Zastosowania inf w Gospodarce
                </Typography>
                <Typography color="textSecondary" variant="body1">
                  Prowadzący: Robert Nitro
                </Typography>
                <Typography color="textPrimary" variant="caption">
                  Termin: XD
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Paper>
    </Card>
  );
};

export default MainCard;
