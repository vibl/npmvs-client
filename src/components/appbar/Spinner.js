import React from 'react';
import {connect} from 'react-redux';
import styled from 'react-emotion';
import SpinnerImg from '../../assets/img/spinner.gif';

const gif = "data:image/gif;base64,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PFSbPVSaP1WZQFaXQleXRVmXR1uYSVyZSl6aS1+aTWCaT2GaUGKcU2WdVWefV2mgWWqjWmylW22nXW+pXnCrX3KtYHOuYXSvY3awZHaxZHexZXiyZnmzZ3m0aHq0aHu1aXy1any2any3any3an23an23an24a364bX+5boC6b4G6cYK7coS8dIW8doe9eIm+eYq/eou/fIzAfY3Af4/BgJDCgpLCgpLCg5LCg5LCg5LDhJPDhZTEh5bFiJfGiZjGipnHi5rIjZvJj53KkZ/Lk6HMlaLNl6TOmabOm6fPnanQnqrQn6rRoKvRoazSoq3So67To67TpK/TpK/Tpa/UpbDUprDVqLPXrbbZsbrbtL3dt8DeusPfvcXhv8fiwsrjxczkx87lydDny9LoztTp0dfr1drs19zt2N3u2t7u29/v3ODv3uLw3+Pw4OPx4eTx4uXy5Ofy5ejz5+n06ev16u317O327e727u/37vD38PH48fL48fP48vP48vP48vP58/T59PX59fX69fb69vf69vf79/j79/j7+Pj7+Pn8+fn8+fr8+vr9+/v9+/v9+/v9+/v9+/v9/Pz+/f3+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7///////////////////////////////////////////8IlgDrCRxIsKDBgwgTKlzIsKHDhxAjLnTlSqLCP38sDlzmjSBGgtWCPVw2qVNHgR8FVnsTRmRDb50SmTS40sqbag9hOlpmMFiYmxG98TwYDKfGo0gV6lLFlCGTp5OUMlXlFGrSq1gFljOKtVwuW1wJlisH0SutXGQNjk3bsJottAOJERPLtm1duVkF4s3brFnev4ADC7YYEAAh+QQJBADtACwAAAAAHgAeAIcAAAABAQECAgIDAwMEBAQFBQUGBgYHBwcICAgJCQkKCgoLCwsMDAwNDQ0ODg4PDw8QEBARERESEhITExMUFBQVFRUWFhYXFxcYGBgZGRkaGhobGxscHBwdHR0eHh4fHx8gICAhISEiIiIjIyMkJCQlJSUmJiYnJycoKCgpKSkqKiorKyssLCwtLS0uLi4vLy8wMDAxMTEyMjIzMzM0NDQ1NTU2NjY3Nzc4ODg5OTlGOTxSOkBdOkJoNkNxM0N5MUN/L0KDLUKHLEOKLEONLESQKkOTLUaVLkeXMEmZMkubNU6cNU6dNE6dNE6eNE6eNE6eNE6fNE6fNE6fNU+fNU+gNlCgNlCgN1GhOFKhOFKhOVOhOVOiOlOiOlSiOlSiO1WiPFWiPFajPlejP1ikQFmkQlqkQ1ulRFylRl6lSF+lSmClTGKlTmSlUGWlUmelVGilV2qnWm2pXG+rX3GsYXSuZHawZXexZnmzZ3q0aXu1an22bH62bX+3b4G4cIK5cYO6coS6c4S7c4W7dIa7dIa8dYa8dYe8doe8d4i9eIm9eYq+eou+fIy+fo6/f4/AgZDBgpLChJPDhZXEh5bFiZfGi5nGi5nGi5rHjJrHjJrHjJvHjZvHjZvIj53JkJ7KkZ/KkqDLk6HMlKLMlqPNmKXOmqfPnKjQnanRn6vSoq3UpbDVqLPWqbTWqrTXrLbZsLrctb7eusLhv8fiwsrjxczlx87mytHnzdPoztToz9Xp0dbq0tjr1Nns1tvs2d3t2t/u3ODv3uLw4OPx4+by5ejz5unz5+nz6Or06Or06ev16uz27O727u/37vD37/H38PL48vP48vP48/T48/T58/T59PX59PX69fb69fb69vf79vf79/j7+Pj7+Pn8+fr9+vv9/Pz+/f3+/f3+/f3+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7///////////////////////////////////////////////////////////////////////////8IpADbCRxIsKDBgwgTKlzIsKHDhxAjLnTlSqJCQ4YsDkS2jSBGgtSAPUS26VRHgR8FUtPjRmTDbackmTS4Eo0eag9hdkJmEFibmxG38TwIDKfGo0gV5nrFlOGXp5SUMn3lFGrSq1gFgquGUJeziOB02eJaUFeRKF8dhqWlC5xBZ1HOpmVYzVbbjUPbwS2i62E1t3gJOut7FFlerM+eZV3MuLHjqwEBACH5BAkEAPoALAAAAAAeAB4AhwAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5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FhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTlNMTVhKTV1ITWFGTW9DTno/ToI9Tog6TY42S5IzSpQwSJYtR5cuSJgwSZkxSpozTJw0Tp43UJ86U6E+VqRDW6dKYahLYqlNZKtOZatQZ6tQZ6xQZ6xRZ6xRZ61SaK1SaK1Taa5Uaa5Uaq5Va69Wa69XbK9XbK9XbK9YbbBYbbBZbrBabrBab7FbcLJdcrJgc7NhdbRjd7RleLVnebVoe7ZqfLZsfbZtfrZvgLdyg7h0hbp3h7t4iLx5ibx7ir19jL+Aj8CCkcGEk8KFlMOGlcSIl8WKmMaNm8iPncmQnsmRn8qSoMqToMqTocuTocuUocuUocuUosyWo8yXpM2Zps6ap8+cqNCdqtCfq9GgrdKirtOlsNWns9aqtdest9iuuNmwutqyu9u1vt23wN25wd66w9+8xeHAyOPEy+THzubL0ejO1OrT2OzX2+7c4O/f4vDg4/Hi5fHj5vLk5/Ll5/Ll6PPm6fPn6fTo6/Tq7PXr7fXs7vbu8Pfv8Pfw8fjy8/n09fv39/v4+Pz5+fz5+v36+v37+/37+/38/P79/f7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v///////////////////////////////////////////////////////////////////////////////////////////////wilANEJHEiwoMGDCBMqXMiwocOHECMurFVLosJOnSwOXEaNIEaCz4A9XNZKVkeBHwU+m4RIZENqslaZNLhykKRnD2G2WmYQGKKbEanxPAgMp8ajSBUCy8WUYZ6nppQyzeUUatKrWAVmq4aQl7OI2ZId41qQFxg1Xx2GLZYsm0FnarSgdVjtWNuBWrQMhAuG18NqbvHq3ev3aN6sAhkxQsy4sePHFgMCACH5BAkEAPMALAAAAAAeAB4AhwAAAAEBAQICAgMDAwQE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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";

const StyledDiv = styled.div`
    position: fixed; 
    top: 30%;
    left: 50%; 
    z-index: 9000;
`;
const Spinner = ({on}) => ! on ? null :
  <StyledDiv id='spinner'>
    <img src={SpinnerImg} alt="spinner"/>
  </StyledDiv>
//
// const setDisplay = (bit) => {
//   console.log('setDisplay', bit);
//   document.getElementById('spinner').style.display = bit ? 'block' : 'none';
// };
// // Off is 0, on is 1.
// const shouldBe = (bit, delay) => {
//   console.log('shouldBe', bit, delay);
//   if( bit === 1 ) {
//     setDisplay(1);
//   } else {
//     setTimeout(() => setDisplay(0), delay);
//   }
// };
const mapStateToProps = (state) => ({
  on: state.ui.spinner,
});
export default connect(mapStateToProps)(Spinner);