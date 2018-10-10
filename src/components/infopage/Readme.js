import React from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import visit from 'unist-util-visit';
import {prepareTargetElement} from '../../util/google-translate';

const absoluteGithubLinks = (tree) => {
  const visitor = (node) => {
    node.href = 'https://google.com';
  };
  visit(tree, 'link', visitor)
};
const image = (github) => (props) => {
  let {src} = props;
  if (!/^https?:\/\//.test(src)) {
    src = github + '/raw/master/' + src;
  }
  return (
    <img {...{...props, src}} alt=""/>
  )
};
class CodeBlock extends React.PureComponent {
  render() {
    const {value } = this.props;
    //style={atelierDuneLight}
    return (
      <SyntaxHighlighter language={'jsx'} >
        {value}
      </SyntaxHighlighter>
    );
  }
}
class Readme extends React.PureComponent {
  ref = React.createRef();

  componentDidMount() {
    prepareTargetElement(this.ref.current);
  }
  componentDidUpdate() {
    prepareTargetElement(this.ref.current);
  }
  render() {
    return (
      <div ref={this.ref}>
        <ReactMarkdown
          {...this.props}

          renderers={{
            code: CodeBlock,
            image: image(this.props.github),
          }}
          escapeHtml={false}
        />
      </div>
    );
  }
}
export default Readme;
