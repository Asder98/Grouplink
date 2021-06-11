import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";

import BasicCard from "../../components/BasicCard";
import MainCard from "../../components/MainCard";

const Group = ({ match }) => {
  const [postings, setPostings] = useState([]);

  console.log(postings);

  const getListOfPostings = (idCourse) => {
    axios
      .get(`http://localhost:8080/api/Notification/Course/${idCourse}`)
      .then((res) => {
        setPostings(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Błąd pobierania listy ogloszen");
      });
  };

  useEffect(() => {
    getListOfPostings(match.params.id);
  }, [match.params.id]);

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container>
        <Box m={5}>
          <Box mb={2}>
            <Typography variant="h6">
              Przeglądasz ogłoszenia w grupie:
            </Typography>
          </Box>
          <MainCard />
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Dostępne ogłoszenia:</Typography>
        </Box>
        <Grid container spacing={3}>
          {postings.map((p, i) => (
            <Grid item lg={6} sm={6} xl={6} xs={12} key={i}>
              <BasicCard details={p}/>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Group;
