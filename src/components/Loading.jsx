import React, { Component } from 'react';
import { DotWave } from '@uiball/loaders';

class Loading extends Component {
  render() {
    return (
      <DotWave
        size={ 47 }
        speed={ 1 }
        color="#cbd0f7"
      />
    );
  }
}

export default Loading;
