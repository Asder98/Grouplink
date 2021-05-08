import React from "react";
import ApplicationBar from "../../components/ApplicationBar/ApplicationBar";

import classes from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <ApplicationBar />
      <main className={classes.Content}>{children}</main>
    </React.Fragment>
  );
};

export default Layout;
