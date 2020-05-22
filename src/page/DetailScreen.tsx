import * as React from "react";
import EnhancedComponent from "./component/HOC";
// import HttpBusinessRequest from "./api/api";
import { Page, Button } from "framework7-react";

class DetailScreen extends React.Component<any, {}> {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    console.log("componentDidMount-detail");

    console.log(this.$f7route);
    console.log(this.props.routeParams)
  }

  componentWillUnmount() {
    console.log("componentWillUnmount-detail");
  }

  render() {
    return (
      <Page
        onPageBeforeIn={this.onPageBeforeIn.bind(this)}
        onPageInit={this.onPageInit.bind(this)}
      >
        <div>
          <h1>Hello, world!</h1>
          <div>{this.props.$core.Utils.formatAmount(3284698)}</div>
        </div>

        <Button fill onClick={this.buttonClick.bind(this)}>
          BACK
        </Button>
      </Page>
    );
  }

  buttonClick() {
    // this.props.easyPop()

    this.$f7router?.back('/home/', {force: true})
  }
  onPageBeforeIn() {
    // do something on page before in
    // console.log("onPageBeforeIn-detail");
  }
  onPageInit() {
    // do something on page init
    // console.log("onPageInit-detail");
  }
}

export default EnhancedComponent(DetailScreen);
