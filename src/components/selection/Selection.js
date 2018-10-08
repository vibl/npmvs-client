import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {pipe, prop} from 'ramda';
import {getPackageColors} from '../../util/utils';
import PackageItem from './PackageItem';
import StyledWrapper from './StyledWrapper';
import {registerBlinkerTarget} from "../util/Blinker";

class PackageList extends PureComponent {
  componentDidMount() {
    registerBlinkerTarget({
      id: 'Selection',
      selector: '#selection .package',
      rule: 'box-shadow: inset 0 0 2px 0 #802, 0 0 2px 0 #802 !important',
      pattern: '3x200+4000',
    });
  }
  render() {
    const {color, focus, packageColors, selection} = this.props;
    return (
      <StyledWrapper {...color} id="selection">
        { selection.map( (packName) =>
          <PackageItem
            key={packName}
            {...{
              packName,
              hasFocus: focus !== undefined && packName === focus,
              color: packageColors[packName],
            }}
          />
        )}
      </StyledWrapper>
    );
  }
  }
const mapStateToProps = (state) => ({
  focus: state.ui.focus,
  selection: state.selection,
  color: state.color,
  packageColors: getPackageColors(state.color, state.selection),
});
export default connect(mapStateToProps)(PackageList);