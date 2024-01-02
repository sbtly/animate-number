// src/Button.tsx
import {
  createElement
} from "react";

// esbuild-css-modules-plugin-namespace:/tmp/tmp-1931-rZmzuYQ9uy9g/main/src/Button.modules.css.js
var digest = "36deaa39e9880f45994f31af0400309679c4db567f7bd79a957697adced7b5dd";
var css = `._button_wrfdr_1 {
    background-color: #c8d5ff;
}
`;
(function() {
  if (!document.getElementById(digest)) {
    var ele = document.createElement("style");
    ele.id = digest;
    ele.textContent = css;
    document.head.appendChild(ele);
  }
})();
var Button_modules_css_default = { "button": "_button_wrfdr_1" };

// src/Button.tsx
import { addPropertyControls, ControlType } from "framer";
var InnerButton = (props) => {
  return /* @__PURE__ */ createElement("button", {
    className: Button_modules_css_default.button
  }, props.title);
};
var Button = InnerButton;
addPropertyControls(Button, {
  title: {
    type: ControlType.String
  }
});
export {
  Button
};
