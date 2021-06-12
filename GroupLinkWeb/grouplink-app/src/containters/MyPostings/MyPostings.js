import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import {useSelector, useDispatch} from 'react-redux'

import UserPostingCard from "../../components/UserPostingCard";

const Group = ({ match }) => {
  const userLogin = useSelector((state) => state.auth.login);
  const [postings, setPostings] = useState([]);
  const [noResults, setNoResult] = useState(false);
  const token = useSelector((state) => state.auth.token);

  console.log(postings);

  const getListOfPostings = () => {
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };
    const body = {
      userLogin,
    };
    axios
      .post(
        "http://localhost:8080/api/Course/GetUserCoursesFiltredData",
        body,
        config
      )
      .then((res) => {
        console.log("register res", res);
        setPostings(res.data);
        if (res.data.length === 0) {
          setNoResult(true);
        } else {
          setNoResult(false);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Błąd pobierania listy ogloszen");
      });

    // axios
    //   .get(`http://localhost:8080/api/Notification/${userLogin}`)
    //   .then((res) => {
    //     setPostings(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     alert("Błąd pobierania listy ogloszen");
    //   });
  };

  useEffect(() => {
    getListOfPostings();
  }, [userLogin]);

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
