import React from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import visit from 'unist-util-visit';

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
    <img {...{...props, src}}/>
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
  render() {
    return (
        <ReactMarkdown
          {...this.props}
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
