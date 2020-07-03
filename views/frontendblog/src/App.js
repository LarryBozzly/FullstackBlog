import React from "react";
import "./App.css";
import About from "./Components/About";
import Board from "./Components/Board";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import Admin from "./Components/Admin1957264";
import AdminPanel from "./Components/AdminPanel";
import Error404 from "./Components/Error";
import Post from "./Components/Post"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    
  }
  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route history="/Post" path="/Post" component={Post} />
          <Route history="/top" path="/top" component={Home} />
          <Route history="/" path="/" exact component={Home} />
          <Route history="/About" path="/About" exact component={About} />
          <Route history="/Board" path="/Board" exact component={Board} />
          <Route history="/Admin1957264" path="/Admin1957264" exact component={Admin} />
          <Route history="/AdminPanel" path="/AdminPanel" exact component={AdminPanel} />
          <Route history="/" path="*" exact component={Error404} />
        </Switch>
      </Router>
    );
  }
}