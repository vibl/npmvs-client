import React from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import styled from 'react-emotion'
import {pipe, prop} from 'ramda';
import {getPackageColors, getUnfocusedColor} from '../../logic/derived-state';
import PackageItem from './PackageItem';

const List = styled.div`
  color: ${ ({lightness}) => lightness > 50 ? 'black' : 'white' }
`;
const PackageList = ({color, focus, packages, packageColors, selection, unfocusedColor}) => (
  <List {...color}>
    { selection.map( (packId, row) => {
      const pack = packages[packId];
      const isFocused = packId === focus;
      const color = ! focus || isFocused ? packageColors[packId].color : unfocusedColor;
      return pack && <PackageItem key={packId} {...{packId, pack, color}}/>;
    })}
  </List>
);
const mapStateToProps = (state) => ({
  focus: state.focus,
  selection: state.selection,
  packages: state.packages,
  color: state.color,
  unfocusedColor: getUnfocusedColor(state.color.lightness),
  packageColors: getPackageColors(state.color, state.selection),
});
export default pipe(
  pure,
  connect(mapStateToProps),
)(PackageList);