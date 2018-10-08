import React, {Component} from 'react';
import { Highlight } from 'react-instantsearch-dom';
import {selectPackage} from '../../logic/router';
const {humanNumber} = require('../../util/vibl-number');

const isHighlightedSpan = el => el.parentElement.classList.contains('ais-Highlight');

class Hit extends Component {

  handlePackageClick = () => {
    selectPackage(this.props.hit.name);
  };
  handleKeywordClick = (event) => {
    let el = event.target;
    if( ! isHighlightedSpan(el) && isHighlightedSpan(el.parentElement) ) {
      el = el.parentElement;
    } else {
      return null;
    }
    const transformValue = value => value + ' ' + el.textContent;
    this.props.setInputValue(transformValue, true);
  };

  render() {
    const {hit} = this.props;
    const {name, repository, downloadsLast30Days, owner: {avatar}} = hit;
    const url = repository && repository.url;
    // hit.keywords = keywords.map(s => s.replace('-', '&#8209;').replace(' ', '&nbsp;'));
    return (
      <tr className="hit">
        <td className="avatar">
          <div className="img-wrapper">
            <img src={avatar} alt="avatar"/>
          </div>
        </td>
        <td className="name" onClick={this.handlePackageClick}>
          <Highlight attribute="name" hit={hit} tagName="mark"/>
          <div className="button tooltip-target">{name}
            { url &&
            <div className="tooltip">
              <a className="url" href={url}>{url}</a>
            </div>
            }
          </div>

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
        <td className="keywords" onClick={this.handleKeywordClick}>
          <Highlight attribute="keywords" hit={hit} tagName="mark" separator=""/>
        </td>
      </tr>
    );
  }
};
export default Hit;