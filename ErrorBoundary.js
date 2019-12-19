/**
 * react错误边界
 */

import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // shouldComponentUpdate() {
  //   if (this.state.hasError) {
  //     // console.log('ErrorBoundary reset error');
  //     // 在update前重置error标记
  //     // 为顾及React16.3之前的用户，因此没有将该逻辑放在getDerivedStateFromProps里
  //     this.setState({ hasError: false });
  //   }
  //   return true;
  // }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // this.setState({ hasError: true });
    console.log('===componentDidCatch===');
    console.log(error, errorInfo);
  }
  //
  // unstable_handleError() {
  //   this.setState({ hasError: true });
  // }

  render() {
    if (this.state.hasError) {
      return <h1>ErrorBoundary: Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
