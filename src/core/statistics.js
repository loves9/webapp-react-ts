/**
 * 数据统计
 *
 */
/* {
    "appid": "string",  // 应用id，可以先行自定义，名称要有意义
    "ctime": "string",  // 发生时间  (设备时间?)
    "did": "string",    // 设备id（如imei或serial number），必要时MD5(?)
    "event": "string",  // 上报事件名
    "model": "string",  // 机型（如能取到）
    "name": "",
    "loginName": "",
    "deptName": "",
    "reqApi": "",
    "reqParam": "",
    "resCode": "",
    "resStatusText": "",
    "dur": "string", // 调用时间
    "info": "string", // 异常信息
    "interval": "string",
    "ua": "string",     // 浏览器 (?)
    "uid": "string"     // 系统赋予的账号或id，必要时MD5加密(?)
} */
import NativeApi from "@/core/native_plugin.js";

export default {
  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate =
      date.getFullYear() +
      seperator1 +
      month +
      seperator1 +
      strDate +
      " " +
      date.getHours() +
      seperator2 +
      date.getMinutes() +
      seperator2 +
      date.getSeconds();
    return currentdate;
  },
  /**
   * 接口埋点
   *
   * @param {*} appid 应用id
   * @param {*} api 接口名称
   * @param {*} describe 描述
   */
  exceptionEvent(appid, api, describe) {
    let requestParams = {
      appid: appid,
      ctime: this.getNowFormatDate(),
      did: device.uuid,
      event: "",
      model: device.model,
      name: "",
      loginName: "",
      deptName: "",
      reqApi: api,
      reqParam: "",
      resCode: "",
      resStatusText: "",
      dur: "",
      info: describe,
      interval: "",
      ua: window.agent,
      uid: ""
    };

    // console.log(navigator.userAgent);

    this.sendRequest(requestParams);
  },

  /**
   * 应用初始化统计 （应用入口进入成功加载后调用）
   *
   * @param {*} appid 应用id
   * @param {*} api 接口名称
   * @param {*} describe 描述
   */
  entryEvent(appid, api, describe) {
    let requestParams = {
      appid: appid,
      ctime: this.getNowFormatDate(),
      did: device.uuid,
      event: "entry",
      model: device.model,
      name: "",
      loginName: "",
      deptName: "",
      reqApi: api,
      reqParam: "",
      resCode: "",
      resStatusText: "",
      dur: "",
      info: describe,
      interval: "",
      ua: window.agent,
      uid: ""
    };

    this.sendRequest(requestParams);
  },

  sendRequest(param) {
    if (process.env.VUE_APP_STATISTICS_URL == "") {
      return;
    }

    // console.log(JSON.stringify(param));

    MXCommon.ajax({
      type: "post",
      url: process.env.VUE_APP_STATISTICS_URL,
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(param),
      complete: function() {},
      success: function(data, status, xhr) {},
      error: function(data, status, xhr) {}
    });
  },

  /**
   * 调用接口时间埋点
   *
   * @param {*} appid
   * @param {*} api
   * @param {*} describe
   * @param {*} interval 时间间隔
   */
  intervalEvent(appid, api, interval, data, status, xhr, reqParams) {
    let _this = this;
    let requestParams = {
      appid: appid,
      ctime: this.getNowFormatDate(),
      did: device.uuid,
      event: "entry",
      model: device.model,
      name: "",
      loginName: "",
      deptName: "",
      reqApi: api,
      reqParam: JSON.stringify(reqParams), // ==
      resCode: xhr.status, // ==
      resStatusText: xhr.statusText, // ==
      dur: "",
      info: "",
      interval: interval,
      ua: window.agent,
      uid: ""
    };

    NativeApi.session.getUser(function(user) {
      requestParams.name = user.name;
      requestParams.loginName = user.login_name;
      requestParams.deptName = user.dept_name;
      _this.sendRequest(requestParams);
    });
  }
};
