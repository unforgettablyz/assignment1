import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="m-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          Something went wrong. Please refresh the page.
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
