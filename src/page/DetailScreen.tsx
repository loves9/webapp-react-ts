import * as React from "react";
import { Page } from "framework7-react";

class DetailScreen extends React.Component {
  // constructor(parameters) {}

  render() {
    return (
      <Page
        onPageBeforeIn={this.onPageBeforeIn.bind(this)}
        onPageInit={this.onPageInit.bind(this)}
      >
        <div>
          <h1>Hello, world!</h1>
          <h2>现在是dddddddd.</h2>
        </div>
      </Page>
    );
  }
  onPageBeforeIn() {
    // do something on page before in
    console.log('onPageBeforeIn')
  }
  onPageInit() {
    // do something on page init
    console.log('onPageInit')

  }

  componentDidMount() {
    // this.$f7ready((f7) => {
    //   f7.dialog.alert('Component mounted');
    // });

    console.log("componentDidMount");
  }
}

export default DetailScreen;
