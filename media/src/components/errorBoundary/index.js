import { Empty } from 'antd';
import React from 'react';
import './index.less';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, info) {
      // logErrorToMyService(error, info);
      console.log(error,info)
    }
  
    render() {
      if (this.state.hasError) {
        return <div className="error-boundary-wrap"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="内部错误，正在处理中..." /></div>;
      }
  
      return this.props.children; 
    }
  }