import { table } from "console"

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

const sectionLayoutEl = (): ElementLayout => {
  const sectionLayoutElTree: ElementLayout = {
    sectionLayoutEl: {
      element: "div",
      class: "group/recent layout-content",
      subElements: [{
        element: "div",
        class: "select-none",
        subElements: [{
          element: "div",
          class: "shrink-0 flex justify-between items-center h-12 ml-2",
          subElements: [{
            element: "div",
            class: "flex items-center text-[12px] font-medium text-notion-120 fill-notion-55/45 shrink-0 max-w-full",
            subElements: [{
              element: "div",
              class: "flex items-center justify-center w-4 h-4 mr-2 mt-px",
              subElements: [{
                element: "div",
                subElements: [{
                  element: "div",
                  class: "w-full h-full",
                  subElements: [{
                    element: "div",
                    text: "🕜"
                  }]
                }]
              }]
            }, {
              element: "span",
              class: "whitespace-nowrap overflow-hidden text-ellipsis",
              text: "Recently visited"
            }]
          }]
        }, {
          element: "div",
          subElements: [{
            element: "div",
            class: "relative min-h-[149px]",
            subElements: [{
              element: "div"
            }, {
              element: "div",
              class: "opacity-0 transition-[opacity] duration-[100ms] easein",
            }, {
              element: "div",
              class: "opacity-0 transition-[opacity] duration-[100ms] easein group-hover/recent:opacity-100",
              subElements: [{
                element: "div",
                attrs: { role: "button", tabindex: 0 },
                class: "group/right select-none cursor-pointer flex items-center shrink-0 whitespace-nowrap h-8 rounded-full text-sm leading-[1.2] min-w-0 pl-2 pr-2 text-notion-55 w-8 shadow-md bg-white absolute -right-4 top-[calc(50%-28px)] justify-center z-[1] border",
                subElements: [{
                  element: "svg",
                  attrsNS: { viewBox: "0 0 16 16" },
                  class: "w-[13px] h-[13px] block fill-notion-55/45 shrink-0 group-hover/right:fill-notion-55",
                  subElements: [{
                    element: "path",
                    attrsNS: { d: "M12.375 8.06445C12.375 7.83203 12.2861 7.63379 12.1084 7.45605L6.77637 2.24023C6.62598 2.08984 6.44141 2.01465 6.22266 2.01465C5.77832 2.01465 5.42285 2.35645 5.42285 2.80078C5.42285 3.01953 5.51172 3.21777 5.66211 3.375L10.4746 8.06445L5.66211 12.7539C5.51855 12.9043 5.42285 13.1025 5.42285 13.3213C5.42285 13.7725 5.77832 14.1143 6.22266 14.1143C6.44141 14.1143 6.62598 14.0391 6.77637 13.8887L12.1084 8.67285C12.293 8.49512 12.375 8.29688 12.375 8.06445Z" }
                  }]
                }]
              }]
            }]
          }]
        }]
      }]
    }
  }
  return sectionLayoutElTree
}

export default sectionLayoutEl
