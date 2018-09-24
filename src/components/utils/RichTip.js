import React, {Fragment} from 'react';
import Popper from '@material-ui/core/Popper';
import Markdown from 'react-markdown';
import Card from '@material-ui/core/Card';

const markdownOptions = {
  escapeHtml: false,
  renderers: {
    centerAligned: (props) => <div style={{textAlign: 'center'}}>{props.children}</div>,
    italic: (props) => {console.log('em props:', props)}
  },
  plugins: [
    require('remark-align'),
  ]
};

class RichTip extends React.Component {
  state = {
    anchorEl: null,
    open: false,
  };
  handleMouseEnter = event => {
    const { currentTarget } = event;
    this.setState({
      anchorEl: currentTarget,
      open: true,
    });
  };
  handleMouseLeave = () => {
    this.setState({
      open: false,
    });
  };
  render() {
    const {button: Button, className, content} = this.props;
    const { anchorEl, open } = this.state;
    const id = open ? 'simple-popper' : null;

    return (
        <Fragment>
          <Button
            aria-describedby={id}
            variant="contained"
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          />
          <Popper
            id={id}
            open={open} 
            anchorEl={anchorEl}
          >
            <Card {...{className}}>
              <Markdown
                source={content}
                {...markdownOptions}
              />
            </Card>
          </Popper>
        </Fragment>
    );
  }
}

export default RichTip;