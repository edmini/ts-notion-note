
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

const documentLayoutEl = (): ElementLayout => {

  const documentLayoutElTree: ElementLayout = {
    documentLayoutEl: {
      element: "div",
      class: "text-notion-55 fill-currentcolor leading-normal font-sans  bg-white transition-[height] duration-[0.1s]",
      subElements: [{
        element: "div",
        class: "h-full",
        subElements: [{
          element: "div",
          class: "w-screen h-full relative flex flex-1 bg-white cursor-text",
          subElements: [{
            element: "nav",
            styles: { transitionProperty: "width, transform", transitionDuration: "0ms, 200ms", transitionTimingFunction: "ease, ease", boxShadow: "rgba(0,0,0,0.024) -1px 0px 0px 0px inset" },
            class: "order-1 grow-0 shrink-0 pointer-events-none relative z-[111] bg-white w-[248px] print:hidden" // bg-notion-247
          }, {
            element: "div",
            class: "group/resize order-3 flex flex-col w-full overflow-hidden isolation-auto",
            subElements: [{
              element: "header",
              class: "bg-white max-w-screen z-[100] select-none print:hidden",
              subElements: [{
                element: "div",
                id: "header",
                class: "w-[calc(100%+0px)] max-w-screen h-11 opacity-100"
              }, {
                element: "div",
                class: "w-[calc(100%+0px)] select-none"
              }]
            }, {
              element: "main",
              class: "grow-0 shrink-0 flex flex-col bg-white z-[1] h-[calc(-44px+100vh)] max-h-full relative w-[100%-248px]"
            }]
          }, {
            element: "div",//order2 display
            class: "hidden cursor-default fixed top-0 left-[248px] w-[calc(-248px+100vw)] h-screen z-[200]"
          }, {
            element: "div",
            id: "order2", // more 320px inbox 390px
            styles: { left: "248px", boxShadow: "rgba(15,15,15,0.04) 0px 0px 0px 1px, rgba(15,15,15,0.03) 0px 3px 6px, rgba(15,15,15,0.06) 0px 9px 24px", clipPath: "inset(0px -24px 0px 0px)", transform: "translateX(-320px) translateZ(0px)" },
            class: "order-2 cursor-default z-[201] w-[320px] h-full bg-white shrink-0 hidden fixed opacity-100",
            subElements: [{
              element: "div",
              id: "expandSidebarEl",
              class: "flex flex-col w-full h-screen",
              subElements: [{
                element: "div",
                id: "expandTitleEl",
                class: "flex flex-col"
              }, {
                element: "div",
                id: "expandBodyEl",
                class: "contents"
              }]
            }, {
              element: "div",
              styles: { boxShadow: "rgb(249,249,249) -1px 0px 0px 0px inset" },
              class: "absolute top-0 right-0 z-[1] h-full w-0.5 transition-[box-shadow] duration-[300ms]"
            }, {
              element: "div",
              id: "resizeSidebar2",
              class: "absolute right-0 w-0 grow-0 z-[1] top-0 bottom-0 pointer-events-auto",
              subElements: [{
                element: "div",
                class: "cursor-col-resize h-full w-4 -ml-1.5"
              }]
            }]
          }]
        }]
      }, {
        element: "div",// overlay
        id: "overlay",
        class: "fixed inset-0 z-[999] pointer-events-none overflow-hidden"
      }]
    }
  }

  return documentLayoutElTree

}

export default documentLayoutEl
