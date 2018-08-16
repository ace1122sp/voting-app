import React from 'react';
import ReactDOM from 'react-dom';

const root = document.getElementById('root-modal');

class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.portal = document.createElement('div');
  }

  componentDidMount() {
    root.appendChild(this.portal);
  }

  componentWillUnmount() {
    root.removeChild(this.portal);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.portal
    );
  }
}

export default Portal;