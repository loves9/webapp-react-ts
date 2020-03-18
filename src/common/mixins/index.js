export default {
  /**
   * 设置页面标题
   *
   * @param {string} title
   */
  setTitle(title) {
    // MXWebui.setWebViewTitle(title);
    console.log(title)
  },

  /**
   * 页面push方法
   * @param url
   * @param options
   */
  easyPush(url, options) {
    if (this.$core) {
      this.$core.RouterManager.push(url, options, this);
    }
  },

  /**
   * 页面pop方法
   * @param options
   * @return 调用是否成功。
   */
  easyPop(url, options) {
    if (this.$core) {
      this.$core.RouterManager.pop(url, options, this);
      return true;
    }
    return false;
  },

  /**
   * 页面pop方法
   * @param options
   * @return 调用是否成功。
   */
  easyPopForResult(url, options) {
    if (this.$core) {
      this.$core.RouterManager.popForResult(url, options, this);
      return true;
    }
    return false;
  },

  /**
   * 获取页面传递的参数
   */
  easyGetParams() {
    if (this.$f7route) {
      return this.$f7route.query;
    }

    return {};
  },

  /**
   * 设置 MX cordova
   *
   * @param {*} callBack 回调函数
   */
  setDeviceReady(callBack) {
    document.addEventListener("deviceready", onDeviceReady, false); // 等待cordova加载

    function onDeviceReady() {
      window.MXSetting &&
        typeof window.MXSetting.setConsoleLogEnabled === "function" &&
        window.MXSetting.setConsoleLogEnabled();
      console.log("ondeviceready-mixin");

      callBack();
    }
  },

  /**
   * frameworkf7 toast
   *
   * @param {*} message
   */
  HRToast(message, icon) {
    if (icon) {
      // material-icons f7-icons
      this.$f7.toast
        .create({
          icon: '<i class="material-icons">' + icon + "</i>",
          text: message,
          position: "center",
          closeTimeout: 2000
        })
        .open();
    } else {
      this.$f7.toast
        .create({
          text: message,
          position: "center",
          closeTimeout: 2000
        })
        .open();
    }
  },

  /**
   * ActionSheet
   *
   * @param {*} buttonArray 按钮字符串数组
   * @param {*} callBack 回调函数
   */
  HRActionSheet(buttonArray, callBack) {
    var buttons = [];
    for (const key in buttonArray) {
      if (buttonArray.hasOwnProperty(key)) {
        const element = buttonArray[key];

        var item = {
          text: element.name,
          onClick: function() {
            callBack({ text: element, index: key });
          }
        };

        buttons.push(item);
      }
    }

    const self = this;
    const app = self.$f7;
    if (!self.actionsToPopover) {
      self.actionsToPopover = app.actions.create({
        buttons: [
          buttons,
          [
            {
              text: "取消",
              onClick: () => {
                self.actionsToPopover.close();
                callBack({ text: "取消", index: -1 });
              }
            }
          ]
        ],
        // Need to specify popover target
        targetEl: self.$el.querySelector(".app")
      });
    }

    // Open
    self.actionsToPopover.open();
  },

  /**
   * Confirm
   *
   * @param {*} text
   * @param {*} callback
   * @param {*} title
   * @param {*} buttons
   * @returns
   */
  HRConfirm(text, callback, title, buttons) {
    if (!text) {
      return;
    }
    if (!title) {
      title = "";
    }
    if (!(buttons instanceof Array)) {
      buttons = ["取消", "确定"];
    }

    const app = this.$f7;
    let appConfirm = app.dialog.create({
      title: title ? title : "",
      text: text,
      buttons: [
        {
          text: buttons[0],
          bold: true,
          color: "black",
          onClick: () => {
            callback(0);
          }
        },
        {
          text: buttons[1],
          bold: true,
          color: "black",
          onClick: () => {
            callback(1);
          }
        }
      ],
      on: {
        opened: function() {}
      }
    });

    appConfirm.open();
  }
};
