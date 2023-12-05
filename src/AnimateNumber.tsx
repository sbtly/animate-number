import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

export function AnimateNumber(props) {
  return (
    <div>hey</div>
  )
}

addPropertyControls(AnimateNumber, {
  memo: {
    type: ControlType.String,
    title: "FAQ",
    placeholder: "이거 개발됐나요? ⭕️",
    defaultValue: "이거 개발됐나요? ⭕️",
    description: "2022.08.01\n- 네이티브, 웹 모두 개발 완료 되었어요.",
  },
})