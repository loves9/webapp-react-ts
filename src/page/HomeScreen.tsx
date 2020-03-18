import * as React from "react";
import { Page, List, ListItem } from "framework7-react";
// import logo from "../logo.svg";
// import { Button } from "antd";
import HttpBusinessRequest from "./api/api";

class HomeScreen extends React.Component<
  {},
  { date: any; systeData: Array<Object> }
> {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      systeData: []
    };
  }

  componentDidMount() {
    // this.$f7ready((f7) => {
    //   f7.dialog.alert('Component mounted');
    // });

    console.log("componentDidMount-home");

    document.addEventListener("deviceready", onDeviceReady, false); // 等待cordova加载

    const _this = this;
    function onDeviceReady() {
      window.MXSetting &&
        typeof window.MXSetting.setConsoleLogEnabled === "function" &&
        window.MXSetting.setConsoleLogEnabled();
      console.log("ondeviceready-mixin");

      _this.queryTodoSerice({});
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount-home");
  }

  render() {
    function ItemList(props) {
      const data = props.data;
      const listItems = data.map(item => <ListItem title={item.systemName} after={item.todoCount} link="#"></ListItem>);
      return (
        <List>
          {listItems}
        </List>
      );
    }

    return (
      <Page
        onPageBeforeIn={this.onPageBeforeIn.bind(this)}
        onPageInit={this.onPageInit.bind(this)}
      >
        <ItemList data={this.state.systeData}></ItemList>
        {/* <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <div>
              <h1>Hello, world!</h1>
              <p>现在是hhhhhhhhhhh.</p>
              <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
              <h2>It is {this.state.systeData.length}.</h2>
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
        </div> */}
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

  queryTodoSerice(params) {
    let request = HttpBusinessRequest.queryTodoSerice(params);
    request.complete = () => {};
    request.success = (data, status, xhr) => {
      console.log("ssss", JSON.stringify(data));
      this.setState({
        systeData: data.data
      });

      // this.renderItemList(this.state.systeData)
    };
    request.error = (data, status, xhr) => {
      console.log("fff", JSON.stringify(data));
    };
    // 发送请求
    request.send();
  }
}

export default HomeScreen;
