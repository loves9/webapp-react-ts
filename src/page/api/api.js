import BusinessRequest from '@/core/http'

const HttpBusinessRequest = {

  /**
	 * Get请求示例
	 *
	 */
  queryMockServer () {
    var args = {
      method: 'get',
      url: 'api://user' // 带api://会自动拼接baseurl
    }

    return new BusinessRequest().baseRequest(args)
  },

  /**
	 * 数据字典
	 *
	 * @params 参数
	 * return object
	 */
  querySearchdict () {
    var args = {
      mask: false,
      method: 'get',
      // dataType: 'text',
      url: 'api://searchdict?userid=01-334@test'
    }

    return new BusinessRequest().baseRequest(args)
  },

  /**
	 * 获取当前用户的待办列表
	 *
	 * @params 参数
	 * return object
	 */
  queryTodolist (params) {
    var args = {
      // mask: false,
      method: 'get',
      dataType: 'text',
      // url: 'api://todolist?userid=01-334@test&page=1',
      url: 'api://todolist',
      parameter: params
    }

    return new BusinessRequest().baseRequest(args)
  },

  /**
	 * 获取当前用户的已办列表
	 *
	 * @params 参数
	 * return object
	 */
  queryDonelist (params) {
    var args = {
      method: 'get',
      url: 'api://donelist',
      dataType: 'text',
      parameter: params
    }

    return new BusinessRequest().baseRequest(args)
  },
  
  /**
	 * 获取通知单详情
	 *
	 * @params 参数
	 * return object
	 */
  queryRecordDetail (params) {
    var args = {
      method: 'get',
      url: 'api://record/'+ encodeURI('{wfBillId}'),
      dataType: 'text',
      // url: 'api://record/'+ params.wfBillId,
      parameter: params
    }

    return new BusinessRequest().baseRequest(args)
  },

  /**
	 * 通知单操作
	 *
	 * @params 参数
	 * return object
	 */
  queryBillOperation (params, url) {
    var realUrl = ''
    if (url) {
      realUrl = url.substring(8, url.length)
    }

    var args = {
      method: 'post',
      url: realUrl?'api://'+ realUrl: 'api://action',
      // dataType: 'text',
      parameter: params
    }

    return new BusinessRequest().baseRequest(args)
  },

  /**
	 * 通知单搜索
	 *
	 * @params 参数
	 * return object
	 */
  queryBillSearch (params) {
    var args = {
      method: 'post',
      url: 'api://search',
      // dataType: 'text',
      parameter: params
    }

    return new BusinessRequest().baseRequest(args)
  },
}

export default HttpBusinessRequest
