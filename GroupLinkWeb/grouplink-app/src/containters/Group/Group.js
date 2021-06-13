import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";

import BasicCard from "../../components/BasicCard";
import MainCard from "../../components/MainCard";

const Group = ({ match }) => {
  const token = useSelector((state) => state.auth.token);
  const [postings, setPostings] = useState([]);
  const [groupInfo, setGroupInfo] = useState();

  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
    add: {
      margin: theme.spacing(2, 0, 1),
      borderRadius: 25,
      height: 50,
      maxWidth: 200,
      marginLeft: 5,
    },
  }));

  const classes = useStyles();

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

  const getGroupInfo = (idCourse) => {
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };
    axios
      .get(`http://localhost:8080/api/Course?id=${idCourse}`, config)
      .then((res) => {
        console.log(res.data);
        setGroupInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Błąd pobierania szczegółów grupy");
      });
  };

  useEffect(() => {
    getListOfPostings(match.params.id);
    getGroupInfo(match.params.id);
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
          <Box display='flex' justifyContent="center" width="100%">
          {groupInfo ? (
            <MainCard details={groupInfo} />
          ) : (
            <CircularProgress color="secondary" />
          )}
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">Dostępne ogłoszenia:</Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.add}
            startIcon={<AddIcon />}
            onClick={() =>
              history.push({
                pathname: `/createposting`,
                state: { type: "new", groupInfo: groupInfo },
              })
            }
          >
            Dodaj ogłoszenie
          </Button>
        </Box>
        <Grid container spacing={3} display="flex" alignItems="stretch">
          {postings.length === 0 ? (
            <Box mb={2} mt={2}>
              <Typography>Brak wyników!</Typography>
            </Box>
          ) : null}
          {postings.map((p, i) => (
            <Grid item lg={6} sm={6} xl={6} xs={12} key={i}>
              <BasicCard details={p} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Group;
