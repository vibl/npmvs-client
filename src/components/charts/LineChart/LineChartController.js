import React, {Component} from 'react';
import {connect} from "react-redux";
import {mem} from '../../../util/utils';
import LineChartView from './LineChartView';
import {keys, last, pipe, values} from 'ramda';
import {setFocus} from "../../../logic/focus";
import {toHtmlClass} from '../../../util/utils';
const {isBlank, notEmpty, lacksElementsOf} = require('../../../util/vibl-fp');

const getPackIdClassNameIndex = (selection) => {
  let acc = {};
  for(const packName of selection) {
    const className = toHtmlClass(packName);
    acc[className] = packName;
  }
  return acc;
};
const getChartData = mem(
  (selection, data) => {
    return selection.map( (packName) => {
      return data[packName] && ({
        packName,
        data: data[packName].map(o => ({...o, packName})),
      })
    })
      .filter(notEmpty)
  }
);
class LineChartController extends Component {
  state = {
    mousePosition: [],
  };
  shouldComponentUpdate(newProps) {
    return newProps.data !== this.props.data;
  }
  handleMouseEnterLine = (event) => {
    let node = event.currentTarget;
    const packIdClassName = node.className.baseVal.split(' ')[1];
    const packName = this.packIdClassNameIndex[packIdClassName];
    this.setState({
      mousePosition: [event.pageX, event.pageY],
    });
    setFocus(packName);
  };
  render () {
    const {data, selection, setFocusedMonth} = this.props;
    if( isBlank(selection) || isBlank(data) || lacksElementsOf(selection, keys(data)) ) return null;
    this.packIdClassNameIndex = getPackIdClassNameIndex(selection);
    return (
      <LineChartView
        {...{
          data: getChartData(selection, data),
          selection,
          handleMouseEnterLine: this.handleMouseEnterLine,
          setFocusedMonth,
        }}
      />
    );
  }
}
const mapStateToProps = (state) => ({
  selection: state.selection,
});
export default connect(mapStateToProps)(LineChartController);