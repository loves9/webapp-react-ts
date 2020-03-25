import * as React from "react";
import EnhancedComponent from "./component/HOC";
import { Page, List, ListItem, Button } from "framework7-react";
// import logo from "../logo.svg";
// import { Button } from "antd";
import HttpBusinessRequest from "./api/api";

class HomeScreen extends React.Component<
  any,
  { date: any; systeData: Array<Object> }
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

    this.props.setDeviceReady(() => {
      this.queryTodoSerice({});
    })
  }

  componentWillUnmount() {
    console.log("componentWillUnmount-home");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate-home", prevProps, prevState, snapshot);
  }

  ItemList(props) {
    const data = props.data;
    const listItems = data.map(item => (
      <ListItem
        key={item.systemName}
        title={item.systemName}
        after={item.todoCount.toString()}
        link="#"
        onClick={e => {
          e.preventDefault();
          this.itemOnPressed(item);
        }}
      ></ListItem>
    ));
    return <List noHairlines>{listItems}</List>;
  }

  render() {
    return (
      <Page
        onPageBeforeIn={this.onPageBeforeIn.bind(this)}
        onPageInit={this.onPageInit.bind(this)}
      >
        <this.ItemList data={this.state.systeData}></this.ItemList>

        <Button fill onClick={this.activateLasers.bind(this)}>
          Test
        </Button>


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

    // this.props.easyPush("/detail/", {});

    this.setState({
      date: '2019-02-10'
    }) 

    // console.log(this.props.$core)
  }

  private itemOnPressed(item) {
    console.log("cccccccc pressed");
    // window.GlobalReactObject.$f7.preloader.show();
    window.MXCommon.lanuchApp(
      item.appID, //这里的appid为创建应用时的应用id
      "1", //参数，可以将其传递到将要启动的插件应用的url上
      function(result) {}, //启动另一个插件应用成功的回调
      function(error) {} //启动另一个插件应用失败的回调
    );
  }

  public queryTodoSerice(params) {
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
