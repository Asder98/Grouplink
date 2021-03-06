import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";

import UserPostingCard from "../../components/UserPostingCard";

const Group = ({ match }) => {
  const userId = useSelector((state) => state.auth.userId);
  const [postings, setPostings] = useState([]);
  const [noResults, setNoResult] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const getListOfPostings = () => {
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };
    axios
      .get(`http://localhost:8080/api/Notification/${userId}`, config)
      .then((res) => {
        setPostings(res.data);
        if (res.data.length === 0) {
          setNoResult(true);
        } else {
          setNoResult(false);
        }
      })
      .catch((err) => {
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
        {noResults ? (
          <Box mb={2} mt={2}>
            <Typography>Brak wyników!</Typography>
          </Box>
        ) : null}
        <Grid container spacing={3}>
          {postings.map((p, i) => (
            <Grid item lg={6} sm={6} xl={6} xs={12} key={i}>
              <UserPostingCard details={p} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Group;
