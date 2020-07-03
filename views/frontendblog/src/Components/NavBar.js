import React from "react";
import "./NavBar.css";
import { Redirect } from "react-router-dom";

export default class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: null,
      history: "/",
    };
    this.redirHome = this.redirHome.bind(this);
    this.redirAbout = this.redirAbout.bind(this);
    this.redirBoard = this.redirBoard.bind(this);
  }
  redirHome() {
    let curr = window.location.pathname.toString();
    window.history.pushState(this.state.history, "", curr);
    if (window.location.pathname.toString().includes("top")) {
      window.location.pathname = "";
    }
    setTimeout(() => {
      this.setState({ redirect: "/" }, () => {
        this.setState({ redirect: null });
      });
    }, 50);
  }

  redirAbout() {
    let curr = window.location.pathname.toString();
    window.history.pushState(this.state.history, "", curr);
    setTimeout(() => {
      this.setState({ redirect: "/About" }, () => {
        this.setState({ redirect: null });
      });
    }, 50);
  }
  redirBoard() {
    let curr = window.location.pathname.toString();
    window.history.pushState(this.state.history, "", curr);
    setTimeout(() => {
      this.setState({ redirect: "/Admin1957264" }, () => {
        this.setState({ redirect: null });
      });
    }, 50);
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="NavBar">
        <sub onClick={this.redirHome} className="HomeRedirect">
          Home
        </sub>
        <sub onClick={this.redirAbout} className="AboutRedirect">
          About
        </sub>
        <sub onClick={this.redirBoard} className="BoardRedirect">
          Board
        </sub>
      </div>
    );
  }
}
