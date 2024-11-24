
interface ElementOptions {
  element: string
  class?: string
  classes?: string[]
  id?: string
  text?: string
  styles?: { [key: string]: string }
  attrs?: { [key: string]: any }
  attrsNS?: { [key: string]: any }
  actions?: { [key: string]: (e?: Event) => void }
  subElements?: ElementOptions | ElementOptions[]
}

interface ElementLayout {
  [LayoutEl: string]: ElementOptions
}

const noteMainLayoutEl = (): ElementLayout => {
  const noteMainLayoutElTree: ElementLayout = {
    noteMainLayoutEl: {
      element: "div",
      class: "contents",
      subElements: [{
        element: "div",
        class: "z-[1] flex flex-col grow relative items-center mr-0 mb-0 overflow-x-hidden overflow-y-auto",
        subElements: [{
          element: "div",
          class: "sticky z-[999] w-full top-0 left-0 h-0 flex-[0 1 0%] mb-0 overflow-x-hidden overflow-y-auto"
        }, {
          element: "div",
          class: "absolute top-0 left-0 z-[99]",
          subElements: [{
            element: "div",
            class: ""
          }]
        }, {
          element: "div",
          attrs: { role: "textbox", tabindex: 0 },
          class: "caret-notion-55 w-full flex flex-col relative items-center grow",
          subElements: [{
            element: "span",
            class: "h-px w-px caret-notion-transparent -mt-px"
          }, {
            element: "div",
            class: "layout pb-[30vh]",
            subElements: [{
              element: "div"
            }, {
              element: "div",//coverEl
              id: "coverEl",
              class: "layout-full isolation-isolate",
            }, {
              element: "div",//toolbarEl
              id: "toolbarEl",
              class: "group/toolbar layout-content mb-0 pb-0",
              subElements: []
            }, {
              element: "div",
              class: "layout-content min-h-[170px] pt-[5px]",
              subElements: [{
                element: "div", //plus moremore icon
                id: "lineEl",
                class: "relative z-[99]",
              }]
            }]
          }, {
            element: "span",
            class: "h-px w-px caret-notion-transparent"
          }]
        }, {
          element: "div",
          class: "absolute top-0 left-0 z-[89]"
        }, {
          element: "div",
          class: "sticky z-[999] w-full bottom-0 left-0 flex-[0 1 0%]"
        }]
      }]
    }
  }
  return noteMainLayoutElTree
}

export default noteMainLayoutEl
