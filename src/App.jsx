import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PgHome from "./pages/pg-home";
import PgTutorials from "./pages/pg-tutorials";
import PgTodos from "./pages/pg-todos";
import { Container } from "react-bootstrap";
import { ToastContainer } from "./assets/js/custom-toastification";
class App extends Component {
  render() {
    return (
      <Router>
        <ToastContainer />
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/home"} className="navbar-brand">
            Home
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/todos"} className="nav-link">
                Todos
              </Link>
            </li>
          </div>
        </nav>

        <Container>
          <Switch>
            <Route exact path={["/", "/home"]} component={PgHome} />
            <Route exact path="/tutorials" component={PgTutorials} />
            <Route exact path="/todos" component={PgTodos} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
