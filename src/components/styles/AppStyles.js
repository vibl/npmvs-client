import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {css, injectGlobal} from 'emotion';
import classNames from 'classnames';
import Color from 'color';
import {range} from 'ramda';
import theme from './theme';
import Blinker from '../util/Blinker';
import MaterialUI from './MaterialUI';
import focusStyles from './focus-styles';
import rankStyles from './rank-styles';
import {mem} from "../../util/utils";

injectGlobal`
  * {
    box-sizing: border-box;
  }
   html {
    font-family: Roboto, sans-serif;
    font-size: 16px;
    background-color: ${theme.pageBackgroundColor};
  }
  body {
    margin: 0;
    padding: 0;
  }
`;
const hueOffset = [0, 120, 240, 60, 330, 180, 90, 270, 30, 150, 300, 210];

export const getColors = mem( (colorConfig) => {
    const {hue: baseHue, saturation, lightness} = colorConfig;
    const ranks = range(0, hueOffset.length - 1);
    return ranks.map( n => Color.hsl(baseHue + hueOffset[n], saturation, lightness));
  }
);
const globalStyles = css`
  background-color: #f7f1f1;
  color: #444;
`;
class AppStyles extends PureComponent {
  render() {
    const {focus, colorConfig, children} = this.props;
    const colors = getColors(colorConfig);
    // We uses independent classes for performance because with `cx` Emotion
    // would concatenate styles each time the focus changes.
    const stylesClasses = classNames(
      globalStyles,
      rankStyles(colors),
      focusStyles(colors, focus),
    );
    return (
      <MaterialUI>
        <Blinker>
          <div id='app' className={stylesClasses}>
            {children}
          </div>
        </Blinker>
      </MaterialUI>
    )
  }
};
const mapStateToProps = (state) => ({
  focus: state.ui.focus,
  colorConfig: state.userprefs.color,
});
export default connect(mapStateToProps)(AppStyles);