import * as React from "react";
import { Page, Button } from "framework7-react";
import logo from "../logo.svg";
// import { Button } from "antd";

class HomeScreen extends React.Component {
  // constructor(_parameters) {
  //   super(_parameters);
  // }

  componentDidMount() {
    // this.$f7ready((f7) => {
    //   f7.dialog.alert('Component mounted');
    // });

    console.log("componentDidMount-home");
  }

  render() {
    return (
      <Page
        onPageBeforeIn={this.onPageBeforeIn.bind(this)}
        onPageInit={this.onPageInit.bind(this)}
      >
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <div>
              <h1>Hello, world!</h1>
              <p>现在是hhhhhhhhhhh.</p>
            </div>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <Button fill onClick={this.activateLasers.bind(this)}>
              Round
            </Button>
          </header>
        </div>
      </Page>
    );
  }
  onPageBeforeIn() {
    // do something on page before in
    
  }
  onPageInit() {
    // do something on page init
    console.log("onPageInit");
  }

  activateLasers() {
    // console.log("bbbbbbbbbbb", this);

    this.$f7router?.navigate("/detail/", {
      // pushState: true,
      props: {}
    });
  }
}

export default HomeScreen;
