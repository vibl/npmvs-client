import React from 'react'
const {assocDotPath, transform} = require('lib/vibl/ramda');

class WithState extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.initialState;
  }
  updateState(updateFn) {
    return new Promise( (resolve, reject) => {
      try {
        this.setState(updateFn, resolve);
      } catch(err) {
        reject(err);
      }
    })
  }
  render() {
    const withState = {
      state: this.state,
      update: {
        assoc: (path, val) => this.updateState(assocDotPath(path, val)),
        transform: (spec) => this.updateState(transform(spec)),
      }
    };
    return this.props.children(withState);
  }
}

export default WithState;