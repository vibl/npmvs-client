import React, {PureComponent} from 'react';
import store from '../logic/store';
import styled from 'react-emotion';
import {prop} from 'ramda';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import {deselectPackage} from "../logic/router-utils";

const Container = styled.div`
    display: flex;
    background-color: ${prop('color')};
    font-size: 16px;
    align-items: center;
`;
const Name = styled.div`
    width: 200px;
    margin-left: 5px;
`;
const Description = styled.div`
  flex: auto;
`;
const CloseButton = styled(Button)`
    margin: 0;
    padding: 0;
    min-height: 28px;
    min-width: 32px;
`;
class PackageItem extends PureComponent {
  handleMouseOver() {
    store.set({focus: this.props.packId});
  }
  handleClose() {
    deselectPackage(this.props.packId);
  }
  render() {
    const {pack, packId, color} = this.props;
    return (
      <Container
        color={color}
        onMouseOver={this.handleMouseOver.bind(this)}
      >
        <Name> <a href={pack.homepage}>{pack.name}</a> </Name>
        <Description>
          {pack.description}
        </Description>
        <CloseButton onClick={this.handleClose.bind(this)}><CloseIcon/></CloseButton>
      </Container>
    );
  }
}
export default PackageItem;