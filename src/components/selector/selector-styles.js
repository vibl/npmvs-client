import theme from "../styles/theme";
import {css} from 'emotion';

const mainColor = theme.palette.primary.main;

export default () => css`

`;
//   control: (base, {isFocused}) => ({
//     ...base,
//     background: '#f7f1f1',
//     borderWidth: '1px',
//     borderStyle: 'solid',
//     borderColor: isFocused ? mainColor : '#f7f1f1',
//   }),
//   menu: (base, {isFocused}) => ({
//     ...base,
//     zIndex: 3000,
//   }),
//   menuList:  (base, {isFocused}) => ({
//     ...base,
//     zIndex: 3000,
//   }),
//   option: (base, { data, isDisabled, isFocused, isSelected }) => {
//     return {
//       ...base,
//       // ? null
//       // : isSelected ? 'white' : isFocused ? '#880022' : null,
//       color: '#880022',
//       // ? '#ccc'
//       // : isSelected
//       //   ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black'
//       //   : data.color,
//       background: isFocused ? '#FEE' : 'white',
//       cursor: isDisabled ? 'not-allowed' : 'default',
//       zIndex: 3000,
//     };
//   },
//   multiValue: (base, state) => {
//     const { data, selectProps: {focus, packageColors} } = state;
//     const packName = data.value;
//     const hasFocus = focus === packName;
//     const packColor = packageColors[packName];
//     if( !packColor ) return null;
//     const {lightGradient, colorDarker, baseColor} = packColor;
//     return {
//       ...base,
//       background: lightGradient,
//       boxShadow: hasFocus
//         ? `0 0 3px 3px ${colorDarker},inset -1px -1px 1px 0px ${colorDarker}`
//         : `0 0 2px 0 ${baseColor}`,
//       border:  hasFocus ? `1px solid ${baseColor}` : '0'
//     };
//   },
//   multiValueLabel: (base, { data }) => ({
//     ...base,
//     fontSize: '0.9rem',
//   }),
//   multiValueRemove: (base, { data }) => ({
//     ...base,
//     ':hover': {
//       color: 'white',
//     },
//   }),
// };