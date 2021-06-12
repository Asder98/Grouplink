import { Box, Card, CardContent, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const SearchCard = ({ details }) => {
  const history = useHistory();

  return (
    <Card sx={{height: "100%"}}>
      <CardContent
        onClick={() => history.push(`/group/${details.idCourse}`)}
        sx={{
            cursor: 'pointer',
          ":hover": {
            cursor: "pointer",
          },
        }}
      >
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
                Prowadzący: {details.lecturerName} {details.lecturerSurname}
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
            <Box width={120}></Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SearchCard;
