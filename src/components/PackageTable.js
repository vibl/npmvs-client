import React, {Component} from 'react';
import {connect} from 'react-redux';
import {pure} from 'recompose';
import styled from 'react-emotion'
import {isEmpty, pickAll} from 'ramda';
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
    const {packName, data} = this.props;
    const content = data.chartData
      ? <Chart packName={packName} data={data.chartData}/>
      : data[packName];
    return <S_td>{content}</S_td>
    //  <td>ok</td>;
  }
}
const TableRow = ({field, packages, data} ) => {
  return (
    <S_tr>
      <th>{field.name}</th>
      {packages.map( packName => <TableCell key={packName} packName={packName} data={data}/> )}
    </S_tr>
  );
}
const PackageTable = pure( ({fields, fieldsOrder}) => {
  return isEmpty(fields.name) ? null :
    <S_table>
      <tbody>
      {fields.map( (field) =>
        <TableRow
          key={field.id}
          field={field}
          packages={Object.keys(fields.name)}
          data={fields[field.id]}
        /> )}
      </tbody>
    </S_table>
});
const mapStateToProps = pickAll(['fields', 'fieldsOrder']);

export default connect(mapStateToProps)(PackageTable);