
import dataProxy from "../../handleStorageData.js"

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

const overlayHeaderTitleLayoutEl = (data: any): ElementLayout => {
  const overlayHeaderTitleLayoutElTree: ElementLayout = {
    overlayHeaderTitleLayoutEl: {
      element: "div",
      class: "flex flex-col w-[380px] min-w-[180px] max-w-[calc(-24px+100vw)] h-full max-h-[70vh]",
      subElements: [{
        element: "div",
        styles: { transform: "translateZ(0px)" },
        class: "z-[1] grow min-h-0 overflow-x-hidden overflow-y-auto mr-0 mb-0",
        subElements: [{
          element: "div",
          class: "sticky z-[999] w-full left-0 h-0 flex-[0 1 0%]"
        }, {
          element: "div",
          class: "flex items-center text-notion-55 text-[13px] py-1 px-1",
          subElements: [{
            element: "div",
            id: "overlayHeaderIconBtn",
            attrs: { role: "button", tabindex: 0 },
            styles: { boxShadow: "rgba(55,53,47,0.16) 0px 0px 0px 1px inset" },
            class: "select-none transition-[background] duration-[20ms] ease-in cursor-pointer flex items-center justify-center h-7 w-7 rounded-[4px] shrink-0 mr-1.5 grow-0 hover:bg-notion-0/10",// border border-notion-145/50
            subElements: [{
              element: "div",
              class: "pointer-events-none flex items-center justify-center h-[18px] w-[18px]",
              subElements: [{
                element: "div",
                class: "h-[12.6px] w-[12.6px] text-[12.6px] leading-none ml-0 text-notion-0",
                subElements: [{
                  element: "span",
                  id: "overlayHeaderIcon",
                  text: data.icon
                }]
              }]
            }]
          }, {
            element: "input",
            attrs: { type: "text", value: data.title },
            id: "overlayHeaderTitle",
            styles: { boxShadow: "rgba(15,15,15,0.1) 0px 0px 0px 1px inset" },
            class: "max-w-full w-full whitespace-prewrap break-all caret-notion-55 blokc grow text-sm leading-5 py-1 px-2.5 rounded-[4px] bg-notion-242/60 cursor-text relative outline-none ",//border border-notion-145/50
            // text: data.title
          }]
        }, {
          element: "div",
          class: "sticky z-[999] w-full bottom-0 left-0 flex-[0 1 0%]"
        }]
      }, {
        element: "footer",
        class: "shrink-0"
      }]
    }
  }
  return overlayHeaderTitleLayoutElTree
}

export default overlayHeaderTitleLayoutEl

