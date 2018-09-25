import React, { Component } from 'react'
import styled from 'react-emotion';
import {css} from 'emotion';
import { node, string, object, bool } from 'prop-types'

const reverse = (str) => str.split('').reverse().join('');

const combineHeaders = (params = {}) => {
  return Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')
};

const obfStyles = css`
  .name, .domain {
    unicode-bidi: isolate-override;
    direction: rtl;
  }
  .at, .dot, .fn {
    display:none;
  }
  .arobase::before {
    content: "@";
    display: inline;
  }
  .point::before {
    content: ".";
    display: inline;
  }
`;
const createContactLink = (tel, email, headers) => {
  let link;
  if (email) {
    link = `mailto:${email}`;
    if (headers) {
      link += `?${combineHeaders(headers)}`
    }
  } else if (tel) {
    link = `tel:${tel}`
  }
  return link
};

class Obfuscate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      humanInteraction: false,
    }
  }
  handleClick(event) {
    event.preventDefault();
    const { tel, sms, facetime, email, headers } = this.props;
    window.location.href = createContactLink(tel, sms, facetime, email, headers)
  }
  handleHumanInteraction = () => {
    this.setState({humanInteraction: true});
  };
  renderClean() {
    const {tel, email, headers, children, ...others} = this.props;
    return (
      <a
        href={createContactLink(tel, email, headers)}
        {...others}
      >
        {children || tel || email}
      </a>
    )
  }
  renderObfuscated() {
    const {email, ...others} = this.props;
    
    const {humanInteraction} = this.state;

    const [_, name, domain, tld] = email.match(/^([^@]+)@(.+)\.([^.]+)$/);
    return (
      <StyledWrapper
        onClick={this.handleHumanInteraction}
        onFocus={this.handleHumanInteraction}
        onMouseOver={this.handleHumanInteraction}
        onContextMenu={this.handleHumanInteraction}
        {...others}
        {...{humanInteraction}}
      >
        <span className="fn">
          inverse(
        </span>
        <span className="name">
          {reverse(name)}
        </span>
        <span className="fn">
          )
        </span>
        <span className="arobase"/>
        <span className="at">
          &nbsp;at&nbsp;
        </span>
        <span className="fn">
          inverse(
        </span>
        <span className="domain">
          {reverse(domain)}
        </span>
        <span className="fn">
          )
        </span>
        <span className="point"/>
        <span className="dot">
          &nbsp;dot&nbsp;
        </span>
        <span className="tld">
          {tld}
        </span>
      </StyledWrapper>
    )
  }
  render() {
    return this.state.humanInteraction
      ? this.renderClean()
      : this.renderObfuscated()
  }
}

Obfuscate.propTypes = {
  children: node,
  tel: string,
  sms: string,
  facetime: string,
  email: string,
  headers: object,
  obfuscate: bool,
  style: object,
  linkText: string,
};

Obfuscate.defaultProps = {
  obfuscate: true,
};
const StyledWrapper = styled.span`
  ${ ({humanInteraction}) => ! humanInteraction && obfStyles}
`;
export default Obfuscate;