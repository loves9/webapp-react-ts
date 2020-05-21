import * as React from "react";
import EnhancedComponent from "./component/HOC";
// import Hello from "./component/Hello";
import { Page, List, ListItem, Button } from "framework7-react";
// import logo from "../logo.svg";
import { Tabs, Badge } from "antd-mobile";
import HttpBusinessRequest from "./api/api";

const tabs = [
  { title: <Badge text={"3"}>First Tab</Badge> },
  // { title: <Badge text={"今日(20)"}>Second Tab</Badge> },
  { title: <Badge dot>Third Tab</Badge> },
];


class ListScreen extends React.Component<
  any,
  { date: any; systeData: Array<Object>;}
> {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      systeData: []
    };

    // 绑定this
    this.ItemList = this.ItemList.bind(this);
  }

  componentDidMount() {
    // this.$f7ready((f7) => {
    //   f7.dialog.alert('Component mounted');
    // });

    console.log("componentDidMount-home");

    // console.log(this.context);

    this.props.setDeviceReady(() => {
      this.queryTodoSerice({});
    });
  }

  componentWillUnmount() {
    console.log("componentWillUnmount-home");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log("componentDidUpdate-home", prevProps, prevState, snapshot);
    // console.log(this.context);
  }

  ItemList(props) {
    const data = props.data;
    const listItems = data.map((item) => (
      <ListItem
        key={item.systemName}
        title={item.systemName}
        subtitle={"待办数量：" + item.todoCount.toString()}
        link="#"
        onClick={(e) => {
          e.preventDefault();
          this.itemOnPressed(item);
        }}
      ></ListItem>
    ));
    return (
      <List mediaList inset noHairlines>
        {listItems}
      </List>
    );
  }

  render() {

    return (
      <Page
        onPageBeforeIn={this.onPageBeforeIn.bind(this)}
        onPageInit={this.onPageInit.bind(this)}
      >
        {/* <div className="hr-block-small"></div>
        <this.ItemList data={this.state.systeData}></this.ItemList> */}

        <Tabs
          tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => {
            console.log("onChange", index, tab);
          }}
          onTabClick={(tab, index) => {
            console.log("onTabClick", index, tab);
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              backgroundColor: "#f4f4f4",
            }}
          >
            <Button
              style={{ width: "200px" }}
              fill
              onClick={this.activateLasers.bind(this)}
            >
              Test
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              backgroundColor: "#f4f4f4",
            }}
          >
    
          </div>
        </Tabs>

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
    // console.log("onPageInit");
  }

  activateLasers() {
    // console.log("bbbbbbbbbbb", window.GlobalReactObject);
    // console.log("ccccc", this);

    // window.GlobalReactObject.$f7.preloader.show();

    // this.$f7router?.navigate("/detail/", {
    //   props: {}
    // });

    this.props.easyPush("/detail/", {
      from: "home",
      aaa: {
        bb: [1, 3],
        cc: "444",
      },
    });

    // this.setState({
    //   date: "2019-02-10"
    // });

    // console.log(this.props.$core)
  }

  private itemOnPressed(item) {
    // window.GlobalReactObject.$f7.preloader.show();
    window.MXCommon.lanuchApp(
      item.appID, //这里的appid为创建应用时的应用id
      "1", //参数，可以将其传递到将要启动的插件应用的url上
      function (result) {}, //启动另一个插件应用成功的回调
      function (error) {} //启动另一个插件应用失败的回调
    );
  }

  public queryTodoSerice(params) {
    let request = HttpBusinessRequest.queryTodoSerice(params);
    request.complete = () => {};
    request.success = (data, status, xhr) => {
      // console.log("ssss", JSON.stringify(data));
      this.setState({
        systeData: data.data,
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

export default EnhancedComponent(ListScreen);
