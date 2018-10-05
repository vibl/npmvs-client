
const copyStyles = (properties = [], origin, dest) => {
  const originStyle = getComputedStyle(origin);
  properties.forEach(  property => dest.style[property] = originStyle[property] )
};

export default (input) => {
  const text = input.value;
  const wrapperDiv = document.createElement("div");
  wrapperDiv.style.position = "absolute";
  const span = document.createElement("span");
  copyStyles(['fontSize', 'fontFamily', 'fontWeight'], input, span);
  span.textContent = text;
  wrapperDiv.appendChild(span);
  input.parentNode.insertBefore(wrapperDiv, input);
  const width = span.offsetWidth;
  input.parentNode.removeChild(wrapperDiv);
  return width;
};