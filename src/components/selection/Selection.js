import React from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import {pipe, prop} from 'ramda';
import {getPackageColors} from '../../util/utils';
import PackageItem from './PackageItem';
import StyledWrapper from './StyledWrapper';

const PackageList = ({color, focus, packages, packageColors, selection}) => (
  <StyledWrapper {...color}>
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
const mapStateToProps = (state) => ({
  focus: state.ui.focus,
  selection: state.selection,
  color: state.color,
  packageColors: getPackageColors(state.color, state.selection),
});
export default pipe(
  pure,
  connect(mapStateToProps),
)(PackageList);