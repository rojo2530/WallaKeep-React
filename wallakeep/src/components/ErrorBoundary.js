import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Muestra el error ' , error.message);
    console.log(error.stack);
    console.log(errorInfo);
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="notification is-danger" id="no-results">
          <p>Oh NO!!, Something went wrong</p>
          <p>{this.state.error.message}</p>
      </div>
      )
    }

    return this.props.children;
  }
}