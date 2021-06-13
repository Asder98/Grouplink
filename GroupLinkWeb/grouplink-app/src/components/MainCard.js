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

const MainCard = ({ details }) => {
  const useStyles = makeStyles((theme) => ({
    Card: {
      height: "100%",
      width: '100%'
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

console.log(details)

  return (
    <Card
      className={classes.Card}
    >
      <Paper elevation={1} className={classes.Paper} width='100%'>
        <CardContent>
          <Box m={1} display="flex" alignItems="center" flexDirection="row">
            <Grid
              container
              spacing={3}
              sx={{ justifyContent: "space-between" }}
            >
              <Grid item>
                <Typography color="textSecondary" variant="body1">
                  {details.groupCode}
                </Typography>
                <Typography color="textPrimary" variant="h5">
                  {details.courseName}
                </Typography>
                <Typography color="textSecondary" variant="body1">
                  Prowadzący: {details.lecturerName} {details.lecturerSurname}
                </Typography>
                <Typography color="textPrimary" variant="caption">
                  Termin: {details.dayOfTheWeek}, {details.startTime} - {details.endTime}, {details.groupMixingType}
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
