import React, {PureComponent} from 'react';
import state from '../../logic/store';
import styled from 'react-emotion';
import {prop} from 'ramda';

const Container = styled.div`
    display: flex;
    background-color: ${prop('color')};
`;
const Name = styled.div`
    width: 200px;
`;
const Description = styled.div`
`;
class PackageItem extends PureComponent {
  handleMouseOver() {
    state.set({focus: this.props.packId});
  }
  static handleMouseOut() {
    state.set({focus: undefined});
  }
  render() {
    const {pack, packId, color} = this.props;
    return (
      <Container
        color={color}
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseOut={PackageItem.handleMouseOut.bind(this)}
      >
        <Name> <a href={pack.homepage}>{pack.name}</a> </Name>
        <Description>
          {pack.description}
        </Description>
      </Container>
    );
  }
}
export default PackageItem;