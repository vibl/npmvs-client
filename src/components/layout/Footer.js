import React from 'react';
import styled from 'react-emotion';
import l from '../../logic/localiz';
import Obfuscate from '../utils/Obfuscate';
import theme from '../styles/theme';

const StyledDiv = styled.div`
  text-align: center;
  font-size: 0.8rem;
  width: 100%;
    
  .author, .author a {
    color: ${theme.palette.primary.main};
  }
`;
const Footer = () => (
  <StyledDiv id="footer">
    <span className="author">
      {l`Created by Vianney Stroebel, full stack React/Node.js developer.
       <>Créé par Vianney Stroebel, développeur full stack React/Node.js.`}&nbsp;
      {l`Contact me at<>Contactez-moi à`}&nbsp;
      <Obfuscate email="npmvs@stroebel.fr"/>&nbsp;
      {l`for projects or jobs in Paris (France) or remote.
       <>pour vos projets ou pour des missions à Paris ou à distance.`}
    </span>
  </StyledDiv>
);
export default Footer;