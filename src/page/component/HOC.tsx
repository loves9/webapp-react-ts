import * as React from "react";

// import HOCMixin from "../../common/mixins";

function HOC(ComponentClass) {
  class EnhancedComponent extends React.Component {
    componentDidMount() {
      console.log("hoc");
    }

    render() {
      return <ComponentClass />;
    }
  }

  // EnhancedComponent.staticMethod = HOCMixin

  return EnhancedComponent;
}

export default HOC;
