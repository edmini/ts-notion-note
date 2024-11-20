
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

const sidebarLayoutEl = (): ElementLayout => {

  const sidebarLayoutElTree: ElementLayout = {
    sidebarLayoutEl: {
      element: "div",
      class: "group/sidebar text-notion-95 font-normal h-full",
      subElements: [{
        element: "div",
        class: "absolute top-0 left-0 bottom-0 flex flex-col w-0 overflow-visible z-[9] pointer-events-none",
        subElements: [{
          element: "div",
          id: "showHideSidebar",
          styles: { transitionProperty: "width, opacity, transform", transitionDuration: "0ms, 200ms, 200ms", transitionTimingFunction: "ease, ease, ease" },
          class: "flex flex-col h-full relative pointer-events-auto w-[248px] opacity-100 bg-notion-247",
          subElements: [{
            element: "div",
            class: "hidden absolute inset-0 rounded-r-lg -z-[1] bg-white shadow-[rgba(15,15,15,0.05)_0px_0px_0px_1px_rgba(15,15,15,0.1)_0px_3px_6px_rgba(15,15,15,0.2)_0px_9px_24px]"
          }, {
            element: "div",
            class: "absolute inset-0 rounded-r-lg -z-[1] hidden shadow-[rgba(0,0,0,0.024)_-1px_0px_0px_0px_inset]"
          }, {
            element: "div",
            class: "flex flex-col h-full max-h-full justify-between overflow-hidden relative",
            subElements: [{
              element: "div",
              class: "flex flex-col h-full max-h-full justify-between",
              subElements: [{
                element: "div",//profile
                id: "profile",
                class: "block shrink-0 grow-0"
              }, {
                element: "div",//menus
                id: "menus",
                class: "grow-0 shrink-0 pb-2 flex flex-col gap-px cursor-pointer ml-2 mr-2"
              }, {
                element: "div",//divider
                class: "shrink-0 shadow-[transparent_0px_0px_0px] transition-[box-shadow] duration-[300ms] h-px w-full -mt-px z-[99]"
              }, {
                element: "div",//item
                id: "itemMenu",
                class: "contents"
              }, {
                element: "div",//bottom
                class: "block flex-[0_0_auto]",
                subElements: [{
                  element: "div",
                  class: "shrink-0 shadow-[transparent_0px_0px_0px] transition-[box-shadow] duration-[300ms] h-px w-full -mt-px z-[99]",
                }, {
                  element: "div",
                  class: "flex min-h-[54px] items-center py-3 px-2",
                  subElements: [{
                    element: "div",
                    id: "sidebarBottom",
                    class: "flex flex-col relative w-full",
                  }]
                }]
              }]
            }]
          }, {
            element: "div",
            id: "sidebarResize",
            class: "absolute right-0 w-0 grow-0 z-[1] top-0 bottom-0 pointer-events-auto",
            subElements: [{
              element: "div",
              class: "cursor-col-resize h-full w-3 -ml-1.5"
            }]
          }]
        }]
      }]
    }
  }

  return sidebarLayoutElTree
}

export default sidebarLayoutEl
