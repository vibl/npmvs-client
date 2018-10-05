import React, {Component} from 'react';
import { Highlight } from 'react-instantsearch-dom';
import {selectPackage} from '../../logic/router';
const {humanNumber} = require('../../util/vibl-number');


class Hit extends Component {
  handlePackageClick = () => {
    selectPackage(this.props.hit.name);
  };
  render() {
    const {hit, setInputValue} = this.props;
    const {name, description, keywords, downloadsLast30Days, owner: {avatar}, _highlightResult} = hit;
    // hit.keywords = keywords.map(s => s.replace('-', '&#8209;').replace(' ', '&nbsp;'));
    return (
      <tr className="hit">
        <td className="avatar">
          <div className="img-wrapper">
            <img src={avatar}/>
          </div>
        </td>
        <td className="name" onClick={this.handlePackageClick}>
          <Highlight attribute="name" hit={hit} tagName="mark"/>
          <div className="button">{name}</div>
        </td>
        <td className="downloads bar-container">
          <div className="bar tooltip-target" style={{width: Math.exp(Math.log10(downloadsLast30Days)) / 150 + 'rem'}}>
            <div className="tooltip">
              {humanNumber(downloadsLast30Days) + ' '
              + l`downloads last month (log scale)<>téléchargements le mois dernier (échelle logarithmique)`}
            </div>
          </div>
        </td>
        <td className="description">
          <Highlight attribute="description" hit={hit} tagName="mark"/>
        </td>
        <td className="keywords" onClick={(evt) => setInputValue(value => value + ' ' + evt.target.parentElement.textContent)}>
          <Highlight attribute="keywords" hit={hit} tagName="mark" separator=""/>
        </td>
      </tr>
    );
  }
};
export default Hit;