import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PackageItem from './PackageItem';
import StyledWrapper from './StyledWrapper';
import {registerBlinkerTarget} from "../util/Blinker";

class PackageList extends PureComponent {
  componentDidMount() {
    registerBlinkerTarget({
      id: 'Selection',
      css: `#selection .package {
              box-shadow: inset 0 0 2px 0 #802, 0 0 2px 0 #802 !important
            }`,
      pattern: '3x200+4000',
    });
  }
  render() {
    const {selection} = this.props;
    return (
      <StyledWrapper id="selection">
        { selection.map( (packName) =>
          <PackageItem key={packName} {...{packName}}/>
        )}
      </StyledWrapper>
    );
  }
  }
const mapStateToProps = (state) => ({
  selection: state.selection,
});
export default connect(mapStateToProps)(PackageList);