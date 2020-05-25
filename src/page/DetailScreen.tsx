import * as React from "react";
import EnhancedComponent from "./component/HOC";
// import HttpBusinessRequest from "./api/api";
import { Page, Button, Navbar } from "framework7-react";

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
        <Navbar
          title="My App"
          backLink="Back"
          color="white"
        ></Navbar>
        <div>
          <h1>Hello, world!</h1>
          <div>{this.props.$core.Utils.formatAmount(3284698)}</div>
        </div>

        <Button fill onClick={this.buttonClick.bind(this)}>
          BACK
        </Button>

        <Button fill onClick={this.next.bind(this)}>
          下一页
        </Button>
      </Page>
    );
  }

  buttonClick() {
    // this.props.easyPop()

    this.$f7router?.back('/home/', {force: true})
  }
  next() {
    this.props.easyPush('/list/', {})

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
