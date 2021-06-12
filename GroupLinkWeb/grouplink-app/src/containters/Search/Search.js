import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import SearchCard from "../../components/SearchCard";

const Search = ({ match }) => {
  const [search, setSearch] = useState("");
  const [groups, setGroups] = useState([]);
  const [noResults, setNoResult] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
    submit: {
      margin: theme.spacing(2, 0, 1),
      borderRadius: 25,
      height: 50,
      maxWidth: 100,
      marginLeft: 5,
    },
    add: {
      margin: theme.spacing(2, 0, 1),
      borderRadius: 25,
      height: 50,
      maxWidth: 160,
      marginLeft: 5,
    },
    searchbox: {
      display: "flex",
      flexDirection: "row",
      alignItems: "space-betwen",
      marginRight: 10,
      marginLeft: 10,
    },
    Container: {
      paddingTop: 25,
    },
  }));

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const checkAccept = (e) => {
    if (e.keyCode === 13) {
      searchAction();
    }
  };

  const searchAction = () => {
    getListOfPostings(search, token);
  };

  const getListOfPostings = (courseCode, token) => {
    const config = {
      headers: { Authorization: `bearer ${token}` },
    };
    const body = {
      courseCode,
    };
    axios
      .post(
        "http://localhost:8080/api/Course/GetCoursesFiltredData",
        body,
        config
      )
      .then((res) => {
        console.log("register res", res);
        setGroups(res.data);
        if (res.data.length === 0) {
          setNoResult(true);
        } else {
          setNoResult(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.Container}>
      <Box className={classes.searchbox} mt={groups.length === 0 ? "50%" : 2}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="search"
          label="Wyszukaj kod grupy"
          name="search"
          value={search}
          onChange={(event) => onSearchChange(event)}
          onKeyDown={(event) => checkAccept(event)}
          autoFocus
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => searchAction()}
        >
          Szukaj
        </Button>
      </Box>
      {noResults ? (
        <Box mb={2} mt={2}>
          <Typography>Brak wyników!</Typography>
        </Box>
      ) : null}
      {groups.length === 0 ? null : (
        <Box mb={2} mt={2}>
          <Typography variant="h6">Wyniki wyszukiwania:</Typography>
        </Box>
      )}
      <Grid container spacing={3}>
        {groups.map((p, i) => (
          <Grid item lg={12} sm={12} xl={12} xs={12} key={i}>
            <SearchCard details={p} />
          </Grid>
        ))}
      </Grid>
      {noResults || groups.length !== 0 ? (
        <Box mb={2} mt={4} display="flex" alignItems="center" flexDirection="column">
          <Typography>Nie znalazłeś swojej grupy?</Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.add}
            onClick={() => history.push(`/creategroup`)}
          >
            Dodaj grupę
          </Button>
        </Box>
      ) : null}
    </Container>
  );
};

export default Search;
