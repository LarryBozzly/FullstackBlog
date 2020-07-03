import React from "react";
import "./About.css";

export default class About extends React.Component {
  constructor() {
    super();
    this.state = {
      firstOffset: "",
      secondOffset: "",
      thirdOffset: "",
      animationId1: "",
      animationId2: "",
      animationId3: "",
      miniBox: "About-MiniBoxNoAnimate",
      miniBox2: "About-MiniBoxNoAnimate",
      miniBox3: "About-MiniBoxNoAnimate",
      plusToSmallWidth: 1,
      crossing: 1,
    };
  }
  scrollFunc = (event) => {
    if (window.pageYOffset > 0 && this.state.firstOffset === "") {
      this.stopCrossing();
      setTimeout(() => {
        this.setState({ firstOffset: window.pageYOffset });
        this.setState({ miniBox: "About-MiniBox" });
        this.Animate1();
        return;
      }, 50);
    }
    if (
      window.pageYOffset >
        ((window.innerHeight * this.state.plusToSmallWidth) / 100) * 30 &&
      this.state.secondOffset === ""
    ) {
      this.stopCrossing();
      setTimeout(() => {
        this.setState({ secondOffset: window.pageYOffset });
        this.setState({ miniBox2: "About-MiniBox2" });
        this.Animate2();
        return;
      }, 50);
    }
    if (
      window.pageYOffset >
        ((window.innerHeight * this.state.plusToSmallWidth) / 100) * 60 &&
      this.state.thirdOffset === ""
    ) {
      this.stopCrossing();
      setTimeout(() => {
        this.setState({ thirdOffset: window.pageYOffset });
        this.setState({ miniBox3: "About-MiniBox3" });
        this.Animate3();
        return;
      }, 50);
    }
    if (window.pageYOffset === 0) {
      this.setState({ crossing: 1 });
      setTimeout(() => {
        this.setState({ firstOffset: "" });
        this.setState({ secondOffset: "" });
        this.setState({ thirdOffset: "" });
        this.setState({ miniBox: "About-MiniBoxBackwards" });
        this.setState({ miniBox2: "About-MiniBoxBackwards" });
        this.setState({ miniBox3: "About-MiniBoxBackwards" });
        return;
      }, 50);
    }
  };
  runCrossing() {
    if (this.state.crossing === 1) {
      this.setState({ crossing: 2 });
    } else if (this.state.crossing > 1 && this.state.crossing < 3) {
      let tmp = this.state.crossing;
      tmp += 1;
      this.setState({ crossing: tmp });
    } else if (this.state.crossing === 3) {
      this.setState({ crossing: 1 });
    }
  }
  stopCrossing() {
    this.setState({ crossing: 0 });
  }
  crossingReturn() {
    if (this.state.crossing === 1) {
      return (
        <div>
          <p className="about-fade-crossing">|</p>
        </div>
      );
    } else if (this.state.crossing === 2) {
      return (
        <div>
          <p className="about-fade-crossing">|</p>
          <p className="about-fade-crossing">|</p>
        </div>
      );
    } else if (this.state.crossing === 3) {
      return (
        <div>
          <p className="about-fade-crossing">|</p>
          <p className="about-fade-crossing">|</p>
          <p className="about-fade-crossing">|</p>
        </div>
      );
    } else if (this.state.crossing === 0) {
      return (
        <div>
          <p className="about-fadeout-crossing">|</p>
          <p className="about-fadeout-crossing">|</p>
          <p className="about-fadeout-crossing">|</p>
        </div>
      );
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.runCrossing();
    }, 500);

    window.addEventListener("scroll", this.scrollFunc, { passive: true });
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollFunc);
    clearInterval(this.interval);
  }
  Animate1 = () => {
    let id = Math.random();
    this.setState({ animationId1: id });
  };
  Animate2 = () => {
    let id = Math.random();
    this.setState({ animationId2: id });
  };
  Animate3 = () => {
    let id = Math.random();
    this.setState({ animationId3: id });
  };
  render() {
    return (
      <div className="About">
        <div className="About-Header-Container">
          <div className="About-Header-Box">
            <div className="About-Mini-Title">
              <h1>This is a website</h1>
              <h3>about this and that </h3>
            </div>
            <div className="About-crossing-container">
              <div className="About-crossing">{this.crossingReturn()}</div>
            </div>
            <div className="About-Container-Allign">
              <div
                id="1"
                key={this.state.animationId1}
                className={this.state.miniBox}
              >
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas et malesuada odio. Sed eget augue ipsum. Pellentesque
                  dictum a enim nec lobortis. Nulla eget urna sagittis mi
                  pretium luctus. In tristique at turpis nec aliquet. Ut sapien
                  ligula, porta id mi ut, vulputate condimentum enim. Vestibulum
                  vitae finibus lacus, sed pellentesque diam. Suspendisse
                  potenti. Sed at viverra lectus. Nam ullamcorper, leo ac
                  lacinia eleifend, turpis purus aliquet est, id vulputate purus
                  quam vitae diam. Mauris metus erat, venenatis sed eleifend ac,
                  vulputate ut ante. Maecenas eros diam, varius at euismod eu,
                  efficitur eget risus. Etiam a elit sed libero ornare congue.
                  Donec vitae dui ac massa faucibus pharetra ac a felis. Sed
                  mollis quis risus a cursus. Suspendisse sagittis libero id
                  mauris feugiat porttitor. Nullam fermentum sem nec dapibus
                  blandit. Nulla eget arcu id ante lacinia scelerisque vitae id
                  lectus. Aliquam tempor, lacus quis finibus suscipit, sem lacus
                  rutrum nisl, id dictum lacus odio eget mi.
                </p>
              </div>
            </div>
            <h2> </h2>

            <div className="About-Container-Allign">
              <div
                id="2"
                key={this.state.animationId2}
                className={this.state.miniBox2}
              >
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas et malesuada odio. Sed eget augue ipsum. Pellentesque
                  dictum a enim nec lobortis. Nulla eget urna sagittis mi
                  pretium luctus. In tristique at turpis nec aliquet. Ut sapien
                  ligula, porta id mi ut, vulputate condimentum enim. Vestibulum
                  vitae finibus lacus, sed pellentesque diam.
                </p>
              </div>
            </div>
            <h2> </h2>
            <div className="About-Container-Allign">
              <div
                id="3"
                key={this.state.animationId3}
                className={this.state.miniBox3}
              >
                <img
                  src="https://images.pexels.com/photos/296115/pexels-photo-296115.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="img"
                  width="100%"
                  height="100%"
                  className="About-img"
                />
              </div>
            </div>
          </div>
          <div style={{ margin: "40vh+40vw" }} />
        </div>
      </div>
    );
  }
}
