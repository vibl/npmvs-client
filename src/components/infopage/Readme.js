import React from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
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
    const { language = 'javascript', value } = this.props;
    return (
      <SyntaxHighlighter language={language}>
        {value}
      </SyntaxHighlighter>
    );
  }
}
class Readme extends React.PureComponent {
  render() {
    return (
        <ReactMarkdown
          source={this.props.source}
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
