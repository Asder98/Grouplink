import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import {useSelector, useDispatch} from 'react-redux'

import UserPostingCard from "../../components/UserPostingCard";

const Group = ({ match }) => {
  const userId = useSelector((state) => state.auth.userId);
  const [postings, setPostings] = useState([]);

  console.log(postings);

  const getListOfPostings = () => {
    axios
      .get(`http://localhost:8080/api/Notification/${userId}`)
      .then((res) => {
        setPostings(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Błąd pobierania listy ogloszen");
      });
  };

  useEffect(() => {
    getListOfPostings();
  }, [userId]);

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container>
        <Box mt={2} mb={2}>
          <Typography variant="h6">Twoje ogłoszenia:</Typography>
        </Box>
        <Grid container spacing={3}>
          {postings.map((p, i) => (
            <Grid item lg={6} sm={6} xl={6} xs={12} key={i}>
              <UserPostingCard details={p}/>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Group;
