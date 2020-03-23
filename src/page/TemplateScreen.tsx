import * as React from "react";
import EnhancedComponent from "./component/HOC";
// import HttpBusinessRequest from "./api/api";
import { Page } from "framework7-react";

class TemplateScreen extends React.Component {
  // constructor(parameters) {}

  componentDidMount() {
    console.log("componentDidMount-template");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount-template");
  }

  render() {
    return (
      <Page
        onPageBeforeIn={this.onPageBeforeIn.bind(this)}
        onPageInit={this.onPageInit.bind(this)}
      >
        <div>
          <h1>Hello, world!</h1>
        </div>
      </Page>
    );
  }

  onPageBeforeIn() {
    // do something on page before in
    console.log('onPageBeforeIn-template')
  }
  onPageInit() {
    // do something on page init
    console.log('onPageInit-template')
  }
}

export default EnhancedComponent(TemplateScreen);