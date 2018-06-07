var offsetLeft = function (elem) {
  var left = elem.offsetLeft;
  var parent = elem.offsetParent;
  while (parent) {
    left += parent.offsetLeft;
    parent = parent.offsetParent;
  }
  return left;
}

var offsetTop = function (elem) {
  var top = elem.offsetTop;
  var parent = elem.offsetParent;
  while (parent) {
    top += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return top;
};

let Offset = {
  top: offsetTop,
  left: offsetLeft
}

export default Offset