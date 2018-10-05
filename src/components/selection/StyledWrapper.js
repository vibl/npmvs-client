import styled from 'react-emotion'

export default styled.div`
    display: flex;
    color: ${ ({lightness}) => lightness > 50 ? 'black' : 'white' };
    
    .package {
      align-items: center;
      border-radius: 0.25rem;;
      display: flex;
      flex-direction: row;
      font-size: 1rem;
      height: 2.1rem;
      margin: 0 0.2rem;
      padding: 0.2rem;
      cursor: default;
      
      .name {
        margin: 0 0.4rem;
        text-shadow: hsl(0, 100%, 100%, 0.4) 0 0.08rem 0, hsl(0, 100%, 0%, 1) 0px -0.08rem 0px;

      }
      .close.button {
        margin: 0 0.2rem;
        padding: 0 0.2rem 0.2rem;
        text-shadow: hsl(0,100%,0%,1) 0 0.08rem 0, hsl(0,100%,100%,0.4) 0 -0.08rem 0;
        box-shadow: hsl(0,100%,0%,0.3) 0 0.04rem 0, hsl(0,100%,100%,0.4) 0 -0.06rem 0;
        font-size: 0.8em;
        
        &:hover {
          box-shadow: hsl(0,100%,100%,0.3) 0 0.04rem 0, hsl(0,100%,0%,0.2) 0 -0.04rem 0;
          background: hsl(0, 100%, 0%, 0.1);
        }
      }
      .close.button::before {
          content: "x";
      }
    }
`;