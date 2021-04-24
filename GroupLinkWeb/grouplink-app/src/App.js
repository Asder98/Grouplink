import { useSelector } from "react-redux";
import { Route, Switch, withRouter, Redirect } from "react-router";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';



import "./App.css";
import Auth from "./containters/Auth/Auth";
import StartPage from "./containters/StartPage/StartPage";
import Landing from "./containters/Landing/Landing";
import Search from "./containters/Search/Search";
import Group from "./containters/Group/Group";
import Posting from "./containters/Posting/Posting";
import MyPostings from "./containters/MyPostings/MyPostings";
import Layout from "./hoc/Layout/Layout";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#2699FB',
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: '#BCE0FD',
      },
      error: {
        main: '#ff0000',
        contrastText: '#FFFFFF'
      },
      warning: {
        main: '#ffff00'
      },
      info: {
        main: '#0000ff'
      },
      success: {
        main: '#00ff00'
      }
    },
    // shape: {
    //   borderRadius: 25
    // },
    overrides: {
      MuiOutlinedInput: {
        root: {
          borderRadius: 25
        }
      }
    }
  });

  let routes = (
    <Switch>
      <Route path="/login" component={Auth} />
      <Route path="/register" component={Auth} />
      <Route path="/" component={Landing} />
      <Redirect to="/" />
    </Switch>
  );

  if (isAuth) { // isAuth
    routes = (
      <Switch>
        <Route path="/start" component={StartPage} />
        <Route path="/search/:id" component={Search} />
        <Route path="/group/create" component={Group} />
        <Route path="/group/:id" component={Group} />
        <Route path="/posting/:id/edit" component={Posting} />
        <Route path="/posting/create" component={Posting} />
        <Route path="/posting/:id" component={Posting} />
        <Route path="/mypostings" component={MyPostings} />
        <Route path="/" component={Search} />
      </Switch>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Layout>{routes}</Layout>
    </ThemeProvider>
  );
}

export default App;
