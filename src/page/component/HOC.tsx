import * as React from "react";
import HOCMixin from "../../common/mixins";
import Core from '../../core/index'

function HOC(ComponentClass) {
  class EnhancedComponent extends React.Component {
    componentDidMount() {
      console.log("componentDidMount-hoc");
    }

    render() {
      // 过滤掉非此 HOC 额外的 props，且不要进行透传
      const { ...passThroughProps } = this.props;

      // 将 props 注入到被包装的组件中。
      // 通常为 state 的值或者实例方法。
      const injectedProp = HOCMixin;

      return (
        <ComponentClass $core={Core} {...injectedProp} {...passThroughProps} />
      );
    }
  }

  // EnhancedComponent.staticMethod = HOCMixin

  return EnhancedComponent;
}

export default HOC;
