
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

const toolbarLayoutEl = (): ElementLayout => {
  const toolbarLayoutElTree: ElementLayout = {
    toolbarLayoutEl: {
      element: "div",
      class: "w-full flex flex-col items-center shrink-0 grow-0",
      subElements: [{
        element: "div",
        class: "max-w-full pl-[calc(0px+env(safe-area-inset-left))] w-full",
        subElements: [{
          element: "div",//icon group
          class: "select-none pointer-events-none",
          subElements: [{
            element: "div",
            class: "flow-root pointer-events-auto",
            subElements: [{
              element: "div",
              id: "iconEl",
              attrs: { role: "button", tabindex: 0 },
              class: "group/icon select-none transition-[background] duration-[20ms] ease-in cursor-pointer flex items-center justify-center h-[78px] w-[78px] rounded-md shrink-0 relative z-[1] ml-[3px] mb-0 pointer-events-auto hover:bg-notion-0/5",
              subElements: [{
                element: "div",
                class: "flex items-center justify-center h-[78px] w-[78px]",
                subElements: [{
                  element: "div",
                  class: "h-[78px] w-[78px] text-[78px] leading-none ml-0 text-notion-0",
                  subElements: [{
                    element: "div",
                    class: "relative w-[78px] h-[78px]",
                    subElements: [{
                      element: "span",
                      id: "icon",
                      class: "absolute -left-3.5 -top-4",
                      text: "",
                    }]
                  }]
                }, {
                  element: "div",
                  id: "removeIconBtn",
                  class: "absolute opacity-0 -right-4 -top-4 w-6 h-6 bg-notion-0/10 text-white rounded-full group-hover/icon:opacity-100",
                  subElements: [{
                    element: "span",
                    class: "text-white font-bold text-center w-6",
                    text: "X"
                  }]
                }]
              }]
            }]
          }, {
            element: "div",
            subElements: [{
              element: "div",
              id: "isIcon",
              class: "flex justify-start flex-wrap pb-1 -ml-px text-notion-55/50 pointer-events-auto",
              subElements: [{
                element: "div",
                id: "iconBtn",
                attrs: { role: "button", tabindex: 0 },
                class: "select-none transition-[opacity] duration-[100ms] cursor-pointer opacity-0 inline-flex items-center shrink-0 whitespace-nowrap h-7 rounded-md text-sm leading-[1.2] min-w-0 pl-1.5 pr-2 text-notion-55/50 pointer-events-auto hover:bg-notion-0/5 group-hover/toolbar:opacity-100",
                subElements: [{
                  element: "svg",
                  attrsNS: { viewBox: "0 0 14 14" },
                  class: "w-3.5 h-3.5 block fill-notion-55/35 shrink-0 mr-1.5",
                  subElements: [{
                    element: "path",
                    attrsNS: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M7 0c3.861 0 7 3.139 7 7s-3.139 7-7 7-7-3.139-7-7 3.139-7 7-7zM3.561 5.295a1.027 1.027 0 1 0 2.054 0 1.027 1.027 0 0 0-2.054 0zm5.557 1.027a1.027 1.027 0 1 1 0-2.054 1.027 1.027 0 0 1 0 2.054zm1.211 2.816a.77.77 0 0 0-.124-1.087.786.786 0 0 0-1.098.107c-.273.407-1.16.958-2.254.958-1.093 0-1.981-.55-2.244-.945a.788.788 0 0 0-1.107-.135.786.786 0 0 0-.126 1.101c.55.734 1.81 1.542 3.477 1.542 1.668 0 2.848-.755 3.476-1.541z" }
                  }]
                }, {
                  element: "span",
                  text: "Add icon"
                }]
              }, {
                element: "div",
                id: "coverBtn",
                attrs: { role: "button", tabindex: 0 },
                class: "select-none transition-[opacity] duration-[100ms] cursor-pointer opacity-0 inline-flex items-center shrink-0 whitespace-nowrap h-7 rounded-md text-sm leading-[1.2] min-w-0 pl-1.5 pr-2 text-notion-55/50 pointer-events-auto hover:bg-notion-0/5 group-hover/toolbar:opacity-100",
                subElements: [{
                  element: "svg",
                  attrsNS: { viewBox: "0 0 14 14" },
                  class: "w-3.5 h-3.5 block fill-notion-55/35 shrink-0 mr-1.5",
                  subElements: [{
                    element: "path",
                    attrsNS: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm0 12h10L8.5 5.5l-2 4-2-1.5L2 12z" }
                  }]
                }, {
                  element: "span",
                  text: "Add cover"
                }]
              }, {
                element: "div",
                id: "commnetBtn",
                attrs: { role: "button", tabindex: 0 },
                class: "select-none transition-[opacity] duration-[100ms] cursor-pointer opacity-0 inline-flex items-center shrink-0 whitespace-nowrap h-7 rounded-md text-sm leading-[1.2] min-w-0 pl-1.5 pr-2 text-notion-55/50 pointer-events-auto hover:bg-notion-0/5 group-hover/toolbar:opacity-100",
                subElements: [{
                  element: "svg",
                  attrsNS: { viewBox: "0 0 16 16" },
                  class: "w-3.5 h-3.5 block fill-notion-55/35 shrink-0 mr-1.5",
                  subElements: [{
                    element: "path",
                    attrsNS: { d: "M4.095 15.465c.287 0 .499-.137.84-.444l2.523-2.277 4.47.007c2.058 0 3.214-1.19 3.214-3.22V4.22c0-2.03-1.156-3.22-3.213-3.22H3.213C1.163 1 0 2.19 0 4.22V9.53c0 2.037 1.196 3.22 3.165 3.213h.273v1.983c0 .45.24.738.657.738zM3.958 5.156a.454.454 0 01-.444-.45c0-.24.198-.438.444-.438h7.157c.246 0 .445.198.445.437a.45.45 0 01-.445.451H3.958zm0 2.256a.454.454 0 01-.444-.451c0-.24.198-.444.444-.444h7.157a.448.448 0 010 .895H3.958zm0 2.256a.448.448 0 010-.896h4.669c.246 0 .437.206.437.452a.438.438 0 01-.437.444H3.958z" }
                  }]
                }, {
                  element: "span",
                  text: "Add commnet"
                }]
              }]
            }]
          }]
        }, {
          element: "div",//title
          class: "pr-[calc(0px+env(safe-area-inset-right))]",
          subElements: [{
            element: "div",
            subElements: [{
              element: "div",
              class: "text-notion-55 font-bold leading-[1.2] text-5xl cursor-text flex items-center",
              subElements: [{
                element: "h1",
                id: "title",
                attrs: { placeholder: "New Page" },
                styles: { wordBreak: "break-word" },
                class: "max-w-full w-full whitespace-prewrap caret-notion-55 pt-[3px] px-0.5 m-0 outline-none",
                text: ""
              }]
            }, {
              element: "div",
              class: 'ml-1'
            }]
          }]
        }]
      }]
    }
  }
  return toolbarLayoutElTree
}

export default toolbarLayoutEl


