import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";

const MainCard = (props) => (
  <Card sx={{ height: "100%" }}>
    <Paper elevation={7}>
      <CardContent>
        <Box m={1} display="flex" alignItems="center" flexDirection="row">
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" variant="body1">
                Szukam 1 osoby do zespołu
              </Typography>
              <Typography color="textPrimary" variant="h5">
                Robertoo11
              </Typography>
              <Typography color="textSecondary" variant="body1">
                Informacje
              </Typography>
              <Typography color="textPrimary" variant="caption">
                Bla bla bla bla
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
            <Button color="primary" variant="contained">
              Napisz wiadomość
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Paper>
  </Card>
);

export default MainCard;
