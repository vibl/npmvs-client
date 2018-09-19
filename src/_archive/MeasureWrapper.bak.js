import React, {Component} from 'react';
import Measure from 'react-measure';
import debounce from 'lodash/debounce';

// import {withContentRect} from "react-measure";

// const MeasureWrapper = (props) => {
//   const {height, width} = props.contentRect.bounds; /*[200, 200] ||*/
//   return ! height ? null : (
//     <div ref={this.props.measureRef} style={{width: '100%', height: 'calc(100% - 20px)', position: 'relative'}}>
//       { this.children({width, height}) }
//     </div>
//   )
// };
class MeasureWrapper extends Component {
  state = {
    dimensions: {
      width: -1,
      height: -1
    }
  };
  setDimensions = debounce( (contentRect) => {
      this.setState({ dimensions: contentRect.bounds })
    }
  , 1000);
  render() {
    const { width, height } = this.state.dimensions;
    return ! height ? null : (
      <Measure
        bounds
        onResize={this.setDimensions}
        >
        {({ measureRef }) =>
          <div  ref={measureRef} style={{flex: 1, position: 'relative'}}>
            { this.props.children({width, height}) }
          </div>
        }
      </Measure>
      )
  }
};
export default MeasureWrapper;
