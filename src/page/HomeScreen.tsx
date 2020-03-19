import * as React from "react";
import EnhancedComponent from "./component/HOC";
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

    this.ItemList = this.ItemList.bind(this);
  }

  componentDidMount() {
    // this.$f7ready((f7) => {
    //   f7.dialog.alert('Component mounted');
    // });

    console.log(99998888);

    // this.itemOnPressed(99999)

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

  ItemList(props) {
    const data = props.data;
    const listItems = data.map((item) => (
      <ListItem
        key={item.systemName}
        title={item.systemName}
        after={item.todoCount}
        link="#"
        onClick={e => {
          e.preventDefault();
          this.itemOnPressed(item);
        }}
      ></ListItem>
    ));
    return <List noHairlines>{listItems}</List>;
  }

  // TestFunctionComponent() {
  //   const data = [{
  //     "systemIdentifier": "bangongyidiantong",
  //     "systemName": "办公一点通",
  //     "todoCount": 14,
  //     "appID": "gonggongshenpi"
  //   }, {
  //     "systemIdentifier": "gongwenshenpi",
  //     "systemName": "公文审批",
  //     "todoCount": 0,
  //     "appID": "gongwenshenpi"
  //   }];
  //   console.log("ooooooo", this);
  //   const listItems = data.map((item, index) => (
  //     <ListItem
  //       key={item.systemName}
  //       title={item.systemName}
  //       after={item.todoCount}
  //       link="#"
  //       onClick={e => {
  //         e.preventDefault();
  //         console.log("iiiiiiiiiii", this);
  //         this.itemOnPressed()
  //         console.log("eeeee", this);
  //       }}
  //     ></ListItem>
  //   ));
  //   return <List noHairlines>{listItems}</List>;
  // }

  render() {
    return (
      <Page
        onPageBeforeIn={this.onPageBeforeIn.bind(this)}
        onPageInit={this.onPageInit.bind(this)}
      >
        <this.ItemList data={this.state.systeData}></this.ItemList>

        {/* <Button fill onClick={this.activateLasers.bind(this)}>
          Test
        </Button> */}

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
    // console.log("bbbbbbbbbbb", window.GlobalReactObject);
    // console.log("ccccc", this);

    // window.GlobalReactObject.$f7.preloader.show();

    // this.$f7router?.navigate("/detail/", {
    //   // pushState: true,
    //   props: {}
    // });
  }

  itemOnPressed(item) {
    console.log("cccccccc pressed");
    // window.GlobalReactObject.$f7.preloader.show();
    window.MXCommon.lanuchApp(
      item.appID, //这里的appid为创建应用时的应用id
      "1", //参数，可以将其传递到将要启动的插件应用的url上
      function(result) {}, //启动另一个插件应用成功的回调
      function(error) {} //启动另一个插件应用失败的回调
    );
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

export default EnhancedComponent(HomeScreen);
