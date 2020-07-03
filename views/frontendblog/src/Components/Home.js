import React from "react";
import "./Home.css";
import { Redirect } from "react-router-dom";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      errorMessage: null,
      headers: "",
      posts: "",
      database: [],
      mounted: false,
      readytorender: false,
      redirect: null,
      pageNumber: "1",
      firstpost: 0,
      secondpost: 1,
      thirdpost: 2,
      history: "/",
      allignTextPointer: "changePageNumber",
      slideshow: "back_intro_header",
    };

    this.databaseHeader = this.databaseHeader.bind(this);
    this.increasePageNumber = this.increasePageNumber.bind(this);
    this.decreasePageNumber = this.decreasePageNumber.bind(this);
  }

  componentDidMount() {
    /*Change Title Here*/ document.title = "Home";
    this.setState({ history: window.location.pathname.toString() });
    let url = window.location.pathname.toString();

    if (url === "/top/1" || url === "/" || url === "/top" || url === "/top/") {
      this.setState({ pageNumber: 1 });
    } else {
      url = url.replace("/top/", "");
      this.setState({ pageNumber: url });
    }
    url = this.calculateMagicNumber();
    if (url > 0) {
      this.setState({ firstpost: url });
      this.setState({ secondpost: url + 1 });
      this.setState({ thirdpost: url + 2 });
    } else {
      this.setState({ firstpost: 0 });
      this.setState({ secondpost: 1 });
      this.setState({ thirdpost: 2 });
    }
    fetch("http://localhost:9000/database/headlines")
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        this.setState({ database: data.reverse() });
      })
      .then(() => this.setState({ mounted: true }))
      .then(() => this.checkifdatabase())
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
      });
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  checkifdatabase() {
    if (this.state.database && this.state.database.length > 0) {
      if (this.state.database.length > this.state.firstpost) {
        this.setState({ readytorender: true });
        this.aligntoMid();
        if (this.state.pageNumber === 1) {
          this.interval = setInterval(() => {
            this.HeaderSlideShow();
          }, 12000);
        }
      } else {
        this.setState({ readytorender: false });
      }
      return;
    }
  }
  databaseHeader(item) {
    if (this.state.mounted === true) {
      if (this.state.database[item] !== undefined) {
        let header = this.state.database[item].header;
        return header;
      }
    }
  }
  databasePost(item) {
    if (this.state.mounted === true && item !== null) {
      if (this.state.database[item] !== undefined) {
        let post = this.state.database[item].post;
        if (post.length > 400) {
          post = post.substring(0, 400);
          post = post + "...";
        } else {
          post = post.substring(0, 400);
        }
        return post;
      }
    }
  }
  databaseId(item) {
    if (this.state.mounted === true && item !== null) {
      if (this.state.database[item] !== undefined) {
        let id = this.state.database[item].id;
        return id;
      }
    }
  }
  databaseimgUrl(item) {
    if (this.state.mounted === true && item !== null) {
      if (this.state.database[item] !== undefined) {
        let imgUrl = this.state.database[item].imgUrl;
        return imgUrl;
      }
    }
  }
  increasePageNumber() {
    window.history.pushState(
      this.state.history,
      "",
      window.location.pathname.toString()
    );

    let num = this.state.pageNumber;
    num = parseInt(num);
    num += 1;
    window.location.pathname = "/top/" + num;
  }
  decreasePageNumber() {
    window.history.pushState(
      this.state.history,
      "",
      window.location.pathname.toString()
    );
    if (this.state.pageNumber > 1) {
      let num = this.state.pageNumber;
      num = parseInt(num);
      num -= 1;
      window.location.pathname = "/top/" + num;
    }
  }
  calculateMagicNumber() {
    let url = window.location.pathname.toString();
    url = url.replace("/top/", "");
    url = parseInt(url);
    let magicnumber = url - 1;
    magicnumber = magicnumber * 3;
    return magicnumber;
  }
  aligntoMid() {
    if (
      this.state.pageNumber > 1 &&
      this.state.database.length > this.state.thirdpost + 1
    ) {
      this.setState({ allignTextPointer: "changePageNumber" });
    } else if (this.state.pageNumber === 1) {
      if (this.state.database.length > this.state.thirdpost + 1) {
        this.setState({ allignTextPointer: "changePageNumberMin" });
      } else {
        this.setState({ allignTextPointer: "changePageNumber" });
      }
    } else {
      this.setState({ allignTextPointer: "changePageNumberMax" });
    }
  }
  HeaderSlideShow() {
    if (this.state.slideshow === "back_intro_header") {
      setTimeout(() => {
        this.setState({ slideshow: "back_intro_header2" });
      });
      setTimeout(() => {
        this.setState({ slideshow: "back_intro_header" });
      }, 800);
      return;
    }
  }
  Recent() {
    return (
      <div className="Recent">
        <h3 className="RecentHeadline">Recent Posts</h3>
        <ul>
          <li>{this.databaseHeader(1)}</li>
          <li>{this.databaseHeader(2)}</li>
        </ul>
      </div>
    );
  }
  introBanner() {
    return (
      <div className="back_intro">
        <sub className={this.state.slideshow}>
          <sub>Info about this website</sub>
        </sub>
      </div>
    );
  }
  firstPost() {
    return (
      <div className="blog-post__header">
        <h1 className="blog-post__title">
          <sub
            className="TextHighlight"
            onClick={() => {
              window.history.pushState(
                this.state.history,
                "",
                window.location.pathname.toString()
              );
              setTimeout(() => {
                this.setState({
                  redirect: "/Post/" + this.databaseId(this.state.firstpost),
                });
              }, 50);
            }}
          >
            {this.databaseHeader(this.state.firstpost)}
          </sub>
        </h1>
        <div className="blog-post__meta">
          <div className="blog-post__date">June 05, 2020</div>
        </div>
        <div className="wrapper">
          <article className="blog-post">
            <div className="blog-post__content">
              {this.databaseimgUrl(this.state.firstpost) !== "" ? (
                <img
                  src={this.databaseimgUrl(this.state.firstpost)}
                  alt="banner"
                  className="bannerimg"
                />
              ) : null}
              <p>{this.databasePost(this.state.firstpost)}</p>
              <sub
                className="ReadMore"
                onClick={() => {
                  window.history.pushState(
                    this.state.history,
                    "",
                    window.location.pathname.toString()
                  );
                  setTimeout(() => {
                    this.setState({
                      redirect:
                        "/Post/" + this.databaseId(this.state.firstpost),
                    });
                  }, 50);
                }}
              >
                READ MORE
              </sub>
            </div>
          </article>
          {this.state.pageNumber > 1 ? "" : this.Recent()}
        </div>
      </div>
    );
  }
  secondPost() {
    return (
      <div className="blog-post__header">
        <h1 className="blog-post__title2">
          <sub
            className="TextHighlight"
            onClick={() => {
              window.history.pushState(
                this.state.history,
                "",
                window.location.pathname.toString()
              );
              this.setState({
                redirect: "/Post/" + this.databaseId(this.state.secondpost),
              });
            }}
          >
            {this.databaseHeader(this.state.secondpost)}
          </sub>
        </h1>
        <div className="blog-post__meta2">
          <div className="blog-post__date2">June 05, 2020</div>
        </div>
        <div className="wrapper2">
          <article className="blog-post2">
            <div className="blog-post__content2">
              {this.databaseimgUrl(this.state.secondpost) !== "" ? (
                <img
                  src={this.databaseimgUrl(this.state.secondpost)}
                  alt="banner"
                  className="bannerimg"
                />
              ) : null}
              <p>{this.databasePost(this.state.secondpost)}</p>
              <sub
                className="ReadMore"
                onClick={() => {
                  window.history.pushState(
                    this.state.history,
                    "",
                    window.location.pathname.toString()
                  );
                  setTimeout(() => {
                    this.setState({
                      redirect:
                        "/Post/" + this.databaseId(this.state.secondpost),
                    });
                  }, 50);
                }}
              >
                READ MORE
              </sub>
            </div>
          </article>
        </div>
      </div>
    );
  }
  thirdPost() {
    return (
      <div className="blog-post__header">
        <h1 className="blog-post__title2">
          <sub
            className="TextHighlight"
            onClick={() => {
              window.history.pushState(
                this.state.history,
                "",
                window.location.pathname.toString()
              );
              this.setState({
                redirect: "/Post/" + this.databaseId(this.state.thirdpost),
              });
            }}
          >
            {this.databaseHeader(this.state.thirdpost)}
          </sub>
        </h1>
        <div className="blog-post__meta2">
          <div className="blog-post__date2">June 05, 2020</div>
        </div>
        <div className="wrapper2">
          <article className="blog-post2">
            <div className="blog-post__content2">
              {this.databaseimgUrl(this.state.thirdpost) !== "" ? (
                <img
                  src={this.databaseimgUrl(this.state.thirdpost)}
                  alt="banner"
                  className="bannerimg"
                />
              ) : null}
              <p>{this.databasePost(this.state.thirdpost)}</p>
              <sub
                className="ReadMore"
                onClick={() => {
                  window.history.pushState(
                    this.state.history,
                    "",
                    window.location.pathname.toString()
                  );
                  setTimeout(() => {
                    this.setState({
                      redirect:
                        "/Post/" + this.databaseId(this.state.thirdpost),
                    });
                  }, 50);
                }}
              >
                READ MORE
              </sub>
            </div>
          </article>
        </div>
      </div>
    );
  }
  leftArrow() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M3 12l18-12v24z" />
      </svg>
    );
  }
  rightArrow() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M21 12l-18 12v-24z" />
      </svg>
    );
  }

  render() {
    if (this.state.readytorender === false) {
      return true;
    }
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="Home">
        <div className="back_101img">
          {this.state.pageNumber === 1 ? this.introBanner() : ""}
          {this.databasePost(this.state.firstpost) !== undefined
            ? this.firstPost()
            : null}
          {this.databasePost(this.state.secondpost) !== undefined
            ? this.secondPost()
            : null}
          {this.databasePost(this.state.thirdpost) !== undefined
            ? this.thirdPost()
            : null}
          <div className="changePage-container">
            <p className="changePageBoard">
              <sub
                className="changePageBoardButton"
                onClick={this.decreasePageNumber}
              >
                {this.state.pageNumber > 1 ? this.leftArrow() : ""}
              </sub>
              <sub className={this.state.allignTextPointer}>
                {this.state.pageNumber}
              </sub>
              <sub
                className="changePageBoardButton"
                onClick={this.increasePageNumber}
              >
                {this.state.database.length > this.state.thirdpost + 1
                  ? this.rightArrow()
                  : ""}
              </sub>
            </p>
          </div>
        </div>
        <div className="footer-wrapper">
          <footer className="footer-container">
            <p className="footer-credits">© 2020 My Imaginary Website</p>
          </footer>
        </div>
      </div>
    );
  }
}
