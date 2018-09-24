import React, {PureComponent} from 'react';
import store from '../../logic/store';
import Measure from 'react-measure';
import debounce from 'lodash/debounce';

class MeasureColumnHeight extends PureComponent {

  setDimensionsCostly = (contentRect) => {
    store.trans({ui: {columnsHeight: {[this.props.name]: contentRect.bounds.height}}});
  };
  setDimensions = debounce(this.setDimensionsCostly, 2000);

  render() {
    return (
      <Measure bounds onResize={this.setDimensions}>
        {({measureRef}) =>
          <div ref={measureRef}>
            {this.props.children}
          </div>
        }
      </Measure>
    );
  }
}
export default MeasureColumnHeight;
