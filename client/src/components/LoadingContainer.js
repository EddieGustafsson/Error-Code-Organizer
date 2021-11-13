import React, { Component } from 'react';
import { Loader, Dimmer } from 'semantic-ui-react'

class LoadingContainer extends Component {

  render() {
    return (
      <Dimmer inverted active>
        <Loader />
      </Dimmer>
    );
  }
}

export default LoadingContainer;
