import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
} from "@material-ui/core";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useSelector } from "react-redux";

const Search = ({ match }) => {
  console.log(match);
  const [search, setSearch] = useState("");
  const [groups, setGroups] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const useStyles = makeStyles((theme) => ({
    submit: {
      margin: theme.spacing(2, 0, 1),
      borderRadius: 25,
      height: 50,
      maxWidth: 100,
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.Container}>
      <Box className={classes.searchbox}>
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
    </Container>
  );
};

export default Search;
