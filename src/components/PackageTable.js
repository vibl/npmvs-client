import React, {Component} from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import mem from 'mem';
import styled from 'react-emotion'
import {isEmpty, keys, pickAll} from 'ramda';
import fns from '../logic/mapper/field-fns';
import Chart from './Chart';

const S_tr = styled.tr`
  border: 1px solid #d4d2d2;
`;
const S_td = styled.td`
  border: 1px solid #d4d2d2;
  min-width: 300px;
`;
const S_table = styled.table`
  border: 1px solid #d4d2d2;
  border-collapse: collapse;
  text-align: left;      
`;

class TableCell extends Component {
  // shouldComponentUpdate(nextProps) {
  //   // if( typeof this.props.value === "object" ) {
  //   //   console.log('shouldComponentUpdate:', nextProps.value !== this.props.value, nextProps.value, this.props.value);
  //   // }
  //   return nextProps.value !== this.props.value;
  // }
  render() {
    // console.log('Rendering TableCell');
    const {field, packName} = this.props;
    const content = field.data.chartData
      ? <Chart packName={packName} data={field.data.chartData}/>
      : fns[field.meta.displayFn](field.data[packName]);
    return <S_td>{content}</S_td>
    //  <td>ok</td>;
  }
}
const TableRow = ({field, packages} ) => {
  return (
    <S_tr>
      <th>{field.meta.id}</th>
      {packages.map( packName => <TableCell key={packName} packName={packName} field={field}/> )}
    </S_tr>
  );
};
const PackageTable = pure(
  ({fields, fieldsOrder, packages}) =>
    ! packages ? null :
     <S_table>
      <tbody>
      { fieldsOrder.map( (fieldId) => <TableRow key={fieldId} packages={packages} field={fields[fieldId]}/> )}
      </tbody>
    </S_table>
);
// Memoizing is important here, otherwise a new array would be created each time, which would render the component.
const getPackages = mem(keys);

const mapStateToProps = (state) => ({
  fields: state.fields,
  fieldsOrder: state.fieldsOrder,
  packages: state.fields.label && getPackages(state.fields.label.data),
});

export default connect(mapStateToProps)(PackageTable);