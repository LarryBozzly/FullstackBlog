import React from 'react';
import './Error.css';

export default class Error extends React.Component {
    constructor() {
      super();
      this.state = {
      };
    }
  
    render() {
      return (
        <div className="Error">
          <h1 className="ErrorHeader"> Error</h1>
        </div>
      );
    }
  }
