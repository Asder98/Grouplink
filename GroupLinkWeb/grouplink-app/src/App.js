import { useSelector } from "react-redux";
import { Route, Switch, withRouter, Redirect } from "react-router";

import "./App.css";
import Auth from "./containters/Auth/Auth";
import StartPage from "./containters/StartPage/StartPage";
import Search from "./containters/Search/Search";
import Group from "./containters/Group/Group";
import Posting from "./containters/Posting/Posting";
import MyPostings from "./containters/MyPostings/MyPostings";
import Layout from "./hoc/Layout/Layout";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);

  let routes = (
    <Switch>
      <Route path="/login" component={Auth} />
      <Route path="/register" component={Auth} />
      <Route path="/" component={StartPage} />
      <Redirect to="/" />
    </Switch>
  );

  if (isAuth) {
    routes = (
      <Switch>
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
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
}

export default App;
