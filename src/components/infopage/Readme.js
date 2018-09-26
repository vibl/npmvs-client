import React from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import visit from 'unist-util-visit';
import prepareTargetElement from '../../util/google-translate';

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
  componentDidMount() {
    // prepareTargetElement(this.el);
  }
  componentDidUpdate() {
    // prepareTargetElement(this.el);
  }
  render() {
    return (
        <ReactMarkdown
          {...this.props}
          ref={el => this.el = el}
          renderers={{
            code: CodeBlock,
            image: image(this.props.github),
          }}
          escapeHtml={false}
        />
    );
  }
}
export default Readme;
