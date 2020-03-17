import Utils from './utils'
import RouterManager from './router_manager'
import NativeApi from './native_plugin'
import Http from './http'

var UA = navigator.userAgent
var ipad = !!(UA.match(/(iPad).*OS\s([\d_]+)/))
var isIphone = !!(!ipad && UA.match(/(iPhone\sOS)\s([\d_]+)/))
var isAndroid = !!(UA.match(/(Android)\s+([\d.]+)/))
var isMobile = !!(isIphone || isAndroid)

if (isMobile) {

} else {

}

console.log(UA)

export default {
  Utils, RouterManager, NativeApi, Http
}
