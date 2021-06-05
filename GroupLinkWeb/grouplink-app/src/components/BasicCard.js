import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import MoneyIcon from "@material-ui/icons/Money";
import { red } from "@material-ui/core/colors";

const BasicCard = (props) => (
  <Card sx={{ height: "100%" }}>
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
  </Card>
);

export default BasicCard;
