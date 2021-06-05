import React from "react";
import { Box, Container, Grid } from "@material-ui/core";
import BasicCard from "../../components/BasicCard";
import MainCard from "../../components/MainCard";

const Group = ({ match }) => {
  console.log(match);

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container maxWidth={false}>
          <MainCard />
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <BasicCard />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <BasicCard />
          </Grid>
          <Grid item lg={3} sm={12} xl={3} xs={12}>
            <BasicCard />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Group;
