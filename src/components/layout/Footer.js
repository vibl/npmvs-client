import React from 'react';
import styled from 'react-emotion';
import l from '../../logic/localiz';
import Obfuscate from '../utils/Obfuscate';
import theme from '../styles/theme';

const githubUrl = 'https://github.com/vibl/npmvs';


const StyledDiv = styled.div`
  text-align: center;
  font-size: 0.8rem;
  width: 100%;
    
  .github a, .author, .author a {
    color: ${theme.palette.primary.main};
  }
`;
const Footer = () => (
  <StyledDiv id="footer">
    <p className="github">
      {l`To support NPMvs, you can talk or write about it, star the dedicated
      <>Pour soutenir NPMvs, vous pouvez en parler ou écrire pour le faire connaître, cliquer sur 'star' dans le`}&nbsp;
      <a href={githubUrl}>
        {l`GitHub repo<>dépôt GitHub`}
      </a>
        {l`, suggest ideas for<>\\ dédié au projet, proposer des idées de`}&nbsp;
      <a href={githubUrl + '/issues?utf8=%E2%9C%93&q=label%3Aenhancement'}>
        {l`new features<>nouvelles fonctionnalités`}
      </a>
        {l`, translate it to a new language, give your feedback and
        <>, le traduire dans une nouvelle langue, me faire part de vos remarques et`}&nbsp;
      <a href={githubUrl + '/issues'}>
        {l`report any issues<>signaler tout problème`}
      </a>.
    </p>
    <p className="author">
      {l`Created by Vianney Stroebel, full stack React/Node.js developer.
       <>Créé par Vianney Stroebel, développeur full stack React/Node.js.`}&nbsp;
      {l`Contact me at<>Contactez-moi à`}&nbsp;
      <Obfuscate email="offer@stroebel.fr"/>&nbsp;
      {l`for projects or jobs in Paris (France) or remote.
       <>pour vos projets ou pour des missions à Paris ou à distance.`}
    </p>
  </StyledDiv>
);
export default Footer;