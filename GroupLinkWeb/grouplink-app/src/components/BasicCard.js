import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";

const BasicCard = ({details}) => (
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
            <Typography color="textSecondary" variant="body1">
              Informacje:
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
          <Button color="primary" variant="contained">
            Napisz wiadomość
          </Button>
          </Box>

        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default BasicCard;
