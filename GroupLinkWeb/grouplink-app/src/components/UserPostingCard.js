import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";

const UserPostingCard = ({details}) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Box m={1} display="flex" alignItems="center" flexDirection="row">
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" variant="body1">
              {details.groupCode}
            </Typography>
            <Typography color="textPrimary" variant="h5">
              {details.courseName}
            </Typography>
            <Typography color="textPrimary" variant="caption">
              {details.courseCode}
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
          <Button color="primary" variant="contained">
            Edytuj
          </Button>
          </Box>

        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default UserPostingCard;
