import BusinessRequest from "@/core/http";

const HttpBusinessRequest = {
  /**
   * Get请求示例
   *
   */
  queryMockServer() {
    var args = {
      method: "get",
      url: "api://user" // 带api://会自动拼接baseurl
    };

    return new BusinessRequest().baseRequest(args);
  },

  /**
   * 数据字典
   *
   * @params 参数
   * return object
   */
  queryTodoSerice(params) {
    var args = {
      mask: false,
      method: "get",
      dataType: 'text',
      url: "api://todo-service/todo/count"
    };

    return new BusinessRequest().baseRequest(args);
  },

  /**
   * 通知单搜索
   *
   * @params 参数
   * return object
   */
  queryBillSearch(params) {
    var args = {
      method: "post",
      url: "api://search",
      // dataType: 'text',
      parameter: params
    };

    return new BusinessRequest().baseRequest(args);
  }
};

export default HttpBusinessRequest;
