import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const UserPostingCard = ({ details }) => {
  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
    add: {
      margin: theme.spacing(2, 0, 1),
      borderRadius: 25,
      height: 50,
      maxWidth: 200,
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
                {details.groupCode}, {details.courseName}
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
            <Box width={120}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.add}
                onClick={() =>
                  history.push({
                    pathname: '/createposting',
                    state: { type: "edit", details: details },
                  })
                }
              >
                Edytuj
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserPostingCard;
