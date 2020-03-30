const routerManager = {
  push(url, params, self) {
    // this.$f7router?.navigate("/detail/", {
    //   props: {}
    // });

    console.log(params);

    self.$f7router.navigate(url, {
      name: url,
      params: {
        params: "hhhhh",
        index: 100
      },
      query: params,
      props: {
        routeParams: params
      }
    });
  },

  pop(url, options, self) {
    if (url === undefined) {
      self.$f7router.back();
    } else {
      self.$f7.views.main.router.back(url, { force: true });
    }
  },

  popForResult(url, params, self) {
    if (!url) {
      self.$f7router.back();
    } else {
      if (self.$f7.device.android) {
        self.$f7.views.main.router.back(url, { force: true, pushState: false });
      } else {
        self.$f7.views.main.router.back(url, { force: true });
      }
    }

    self.$f7.emit("easyPopForResult", params);
  }
};

export default routerManager;
