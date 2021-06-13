import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EmailIcon from '@material-ui/icons/Email';

const BasicCard = ({ details }) => {
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(2, 0, 1),
      borderRadius: 25,
      height: 50,
      marginLeft: 5,
    },
  }));

  const classes = useStyles();

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
              >
                <EmailIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BasicCard;
