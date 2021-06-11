import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
  } from "@material-ui/core";
  
  const SearchCard = () => (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box m={1} display="flex" alignItems="center" flexDirection="row">
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" variant="body1">
                {"a"}
              </Typography>
              <Typography color="textPrimary" variant="h5">
                {"a"}
              </Typography>
              <Typography color="textPrimary" variant="caption">
                {"a"}
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
                
            </Box>
  
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
  
  export default SearchCard;
  