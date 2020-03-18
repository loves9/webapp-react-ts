import axios from "axios";
import Statistics from "./statistics";

class BusinessRequest {
  // constructor(options = {}) {}
  /**
   *  http 状态码对应的文本
   */
  statusReasons = {
    100: "Continue",
    101: "Switching Protocols",
    102: "Processing",
    200: "OK",
    201: "Created",
    202: "Accepted",
    203: "Non-Authoritative Information",
    204: "No Content",
    205: "Reset Content",
    206: "Partial Content",
    207: "Multi-Status",
    300: "Multiple Choices",
    301: "Moved Permanently",
    302: "Moved Temporarily",
    303: "See Other",
    304: "Not Modified",
    305: "Use Proxy",
    307: "Temporary Redirect",
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Time-out",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Request Entity Too Large",
    414: "Request-URI Too Large",
    415: "Unsupported Media Type",
    416: "Requested range not satisfiable",
    417: "Expectation Failed",
    422: "Unprocessable Entity",
    423: "Locked",
    424: "Failed Dependency",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Time-out",
    505: "HTTP Version not supported",
    507: "Insufficient Storage",
    1000: "Request Timeout",
    1002: "Cannot Connect To Host",
    1003: "Unknown error",
    1004: "Not network",
    1008: "Not Connected To Internet",
    4000: "Transaction fail",
    4001: "Parse data fail"
  };

  // ----------------- 请求数据 ---------------
  config = {
    method: "GET",
    url: "",
    parameter: {},

    requestTimeout: true,

    mask: true,

    /**
     *  ProgressBar 要显示的文字，该属性可以有三种状态：
     *
     *  1. ''    :空串，发送http请求的过程中显示一个带有缺省文字的 ProgressBar。
     *  2. null  :空值，发送http请求的过程中不显示 ProgressBar。
     *  3. string:非空字符串，发送http请求的过程中显示一个 ProgressBar，其中的文字为该属性设定的值。
     */
    maskMsg: "正在加载",

    /**
     *  http请求出错时是否自动显示 toast 消息，测试环境下此值无效，强制弹出错误 toast 。
     */
    autoToast: true,

    /**
     * 请求数据的类型，它决定了 htpp 请求返回的数据类型及数据加载的位置。可以取以下值之一：
     * ’json‘：
     *      从服务加载 JSON 格式数据，请求如果成功返回，则 resultData 属性是一个 JSON 对象。
     *
     */
    dataType: "json" // 内部使用属性，不要访问。
  };

  requestId = "";

  // 请求队列相关数据
  requestCount = 0;
  requestIdPrefix = (function() {
    var date = new Date();
    return "R" + date.getHours() + date.getMinutes() + date.getSeconds();
  })();
  getReqeustId() {
    return this.requestIdPrefix + this.requestCount++;
  }

  baseRequest(args) {
    if (typeof window.MXCommon === "undefined") {
      // 初始化 window.MXCommon
      document.addEventListener("deviceready", onDeviceReady, false); // 等待cordova加载
      function onDeviceReady() {
        window.MXSetting &&
          typeof window.MXSetting.setConsoleLogEnabled === "function" &&
          window.MXSetting.setConsoleLogEnabled();
        console.log("ondeviceready---http");
      }
    }

    // 公共参数
    var _parameter = {
      // 这里可添加公共参数，预留
      // _Guid: this.getReqeustId()
      // userid: process.env.NODE_ENV == "development" ? '01-334@test': ''
    };

    // 合并业务请求参数
    if (args.hasOwnProperty("parameter")) {
      var keys = Object.keys(args.parameter);
      keys.forEach(function(key) {
        _parameter[key] = args.parameter[key];
      });
    }

    var _url = "";
    // url如果包含api://就拼接baseurl
    if (args.url.indexOf("api://") !== -1) {
      _url = args.url.replace("api:/", process.env.REACT_APP_BASE_URL);
    } else {
      _url = args.url;
    }

    this.config.method = args.method ? args.method : "json";
    this.config.url = _url;
    this.config.parameter = _parameter;
    this.config.maskMsg = args.maskMsg ? args.maskMsg : this.config.maskMsg;
    this.config.autoToast = !args.autoToast;
    this.config.dataType = args.dataType;

    if (args.mask !== undefined || args.mask === false) {
      this.config.mask = false;
    }

    return this;
  }

  beforeRequest() {
    if (this.config.mask) {
      this.showPreloader();

      setTimeout(() => {
        this.closePreloader();

        // TODO: 超时
        if (this.requestTimeout) {
          window.GlobalReactObject.$f7.toast
            .create({
              text: "请求超时",
              position: "center",
              closeTimeout: 2000
            })
            .open();
        }
      }, 60000);
    }
  }

  showPreloader() {
    // window.GlobalReactObject.$f7.dialog.preloader(this.config.maskMsg)
    window.GlobalReactObject.$f7.preloader.show();
  }

  closePreloader() {
    // window.GlobalReactObject.$f7.dialog.close()
    window.GlobalReactObject.$f7.preloader.hide();
  }

  /**
   * Application.BusinessRequest
   *
   * @method send
   *
   * 发送 http 请求
   * @param parameter {Object}
   * 请求参数字典
   */
  send(parameter) {
    this.beforeRequest();

    // 执行本地Http请求。
    let _this = this;

    parameter = parameter || this.config.parameter;

    console.log('url=>', this.config.url)

    if (this.config.method === 'post') {
      parameter = JSON.stringify(parameter)
    }

    // 适配手机端与pc端
    if (typeof window.MXCommon !== "undefined") {
      var timeInterval;
      var startTimeStamp;
      var stopTimeStamp;
      // 开始函数
      function start() {
        startTimeStamp = new Date().getTime();
      }
      // 暂停函数
      function stop(data, status, xhr, reqParams) {
        stopTimeStamp = new Date().getTime();
        timeInterval = stopTimeStamp - startTimeStamp;

        const properties = require("../../package.json");
        const app_id = properties.name;
        // 上送数据
        Statistics.intervalEvent(
          app_id,
          _this.config.url,
          timeInterval,
          data,
          status,
          xhr,
          reqParams
        );
      }

      start(); // 开始计时
      window.MXCommon.ajax({
        type: _this.config.method,
        url: _this.config.url,
        contentType: _this.config.method === 'post' ? "application/json;charset=utf-8" : '',
        dataType: _this.config.dataType,
        async: true,
        data: parameter,
        complete: () => {
          this.closePreloader();

          if (_this.complete === undefined) {
            return;
          }

          _this.complete();

          _this.requestTimeout = false;
        },
        success: (data, status, xhr) => {
          if (!data) {
            console.log('data undefined', JSON.stringify(xhr))
            window.GlobalReactObject.HRToast('data undefined');
            return
          }
          
          try {
            data = JSON.parse(data);
          } catch (error) {
            window.GlobalReactObject.HRToast(error);
          }

          if (xhr.status === 200) {
            _this.success(data, status, xhr);
          } else {
            if (_this.config.autoToast) {
              window.GlobalReactObject.HRToast(data, "close");
            }
            _this.error(data, status, xhr);
          }

          // 停止计时
          stop(data, status, xhr, parameter);
        },
        error: function(data, status, xhr) {
          if (_this.config.autoToast) {
            window.GlobalReactObject.HRToast(data, "close");
          }

          _this.error(data, status, xhr);

          // 停止计时
          stop(data, status, xhr, parameter);

          if (
            xhr.status === 400 ||
            xhr.status === 404 ||
            xhr.status === 405 ||
            xhr.status === 415
          ) {
            // window.GlobalReactObject.easyPush('/upgradePage', { errorData: data, type: 'system' })
          }
          // TODO: 系统升级
          else if (0) {
          }
        }
      });
    } else {
      if (process.env.NODE_ENV === "development") {
        // window.GlobalReactObject.$f7.dialog.preloader('window.MXCommon未初始化，正在调用axios')
      }

      axios({
        headers: {
          Origin: 'Access-Control-Allow-Origin'
        },
        method: _this.config.method,
        url: _this.config.url,
        data: parameter
      })
        .then(response => {
          window.GlobalReactObject.$f7.dialog.close();

          if (response.status === 200) {
            _this.success(response.data, response.status, "");
          } else {
            _this.error(response.data, response.status, "");
          }

          _this.complete();
        })
        .catch(error => {
          console.log(error);
          window.GlobalReactObject.$f7.dialog.close();

          if (_this.config.autoToast) {
            // window.GlobalReactObject.$vux.toast.show({
            //     text: error.data
            // })
          }
          _this.error(error.data, error.status, "");
          _this.complete();
        });
    }
  }
}

export default BusinessRequest;
