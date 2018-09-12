import React from 'react';
import styled from "react-emotion";
import {connect} from "react-redux";

// const Wrapper = styled.div`
//   & #focus-${ ({focus}) => focus} {
//     z-index: 10;
//   }
// `;

const Wrapper =  styled.div(
  ({focus}) => ({ [`& #focus-${focus}`] : {zIndex: 10} })
);

// `& #focus-${focus}`

const FocusController = ({children}) => (
   <Wrapper id="focus-controller">
     {children}
   </Wrapper>
);
const mapStateToProps = (state) => ({
  focus: state.focus,
});
export default connect(mapStateToProps)(FocusController);
