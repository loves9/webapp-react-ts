import * as React from "react";
import EnhancedComponent from "./component/HOC";
// import Hello from "./component/Hello";
import { Page, List, ListItem } from "framework7-react";
// import logo from "../logo.svg";
import { Grid } from "antd-mobile";
import HttpBusinessRequest from "./api/api";

const data = Array.from(new Array(9)).map((_val, i) => ({
  icon: "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
  text: `应用${i}`,
}));

class HomeScreen extends React.Component<
  any,
  { date: any; systeData: Array<Object> }
> {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      systeData: [],
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
      // this.queryTodoSerice({});
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
        <Grid
          data={data}
          activeStyle={false}
          onClick={(el, index: number) => {
            // e.preventDefault();
            this.itemOnPressed(index);
          }}
        />
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

    // this.setState({
    //   date: "2019-02-10"
    // });

    // console.log(this.props.$core)
  }

  private itemOnPressed(index) {
    console.log(index)
    this.props.easyPush("/list/", {
      from: "list",
      aaa: {
        bb: [1, 3],
        cc: "444",
      },
    });
    // window.GlobalReactObject.$f7.preloader.show();
    // window.MXCommon.lanuchApp(
    //   item.appID, //这里的appid为创建应用时的应用id
    //   "1", //参数，可以将其传递到将要启动的插件应用的url上
    //   function (result) {}, //启动另一个插件应用成功的回调
    //   function (error) {} //启动另一个插件应用失败的回调
    // );
  }

  public queryTodoSerice(params) {
    let request = HttpBusinessRequest.queryTodoSerice(params);
    request.complete = () => {};
    request.success = (data, status, xhr) => {
      // console.log("ssss", JSON.stringify(data));
      this.setState({
        systeData: data.data,
      });

    };
    request.error = (data, status, xhr) => {
      console.log("fff", JSON.stringify(data));
    };
    // 发送请求
    request.send();
  }
}

export default EnhancedComponent(HomeScreen);
