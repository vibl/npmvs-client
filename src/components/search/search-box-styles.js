import styled from 'react-emotion';

export default styled.div`
    margin-left: 0.4rem;

    input[type='search'] {
      background: white;
      height: 2.2rem;
      border: 1px solid #CCC;
      border-radius: 0.3rem;
      padding: 0.4rem;
      font-size: 1rem;
      color: #333; 
      min-width: 20rem;
      width: ${p => p.width + 40}px;
    }
    button {
      display: none;
`;