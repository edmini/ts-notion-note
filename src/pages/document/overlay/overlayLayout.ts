
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


const overlayLayoutEl = (data: any): ElementLayout => {
  const overlayLayoutElTree: ElementLayout = {
    overlayLayoutEl: {
      element: "div",
      class: "pointer-events-auto relative z-[1]",
      subElements: [{
        element: "div",
        subElements: [{
          element: "div",
          id: "overlayLayoutRemove",
          class: "fixed pointer-events-auto top-0 left-0 w-screen h-screen",
          subElements: [{
            element: "div",
            id: "overlayPositon",
            class: `fixed pointer-events-none left-[${data.left}px] top-[${data.top}px]`, // left, top setup
            subElements: [{
              element: "div",
              class: `w-[${data.width}] h-[${data.height}]`,// width, height
            }, {
              element: "div",
              class: "absolute top-0 left-0 w-full h-full flex flex-col justify-start items-start",
              subElements: [{
                element: "div",
                class: "relative top-full pointer-events-auto",
                subElements: [{
                  element: "div",
                  styles: { transformOrgin: "0% top", transition: "opacity 200ms ease" },
                  class: "flex items-center relative flex-col-reverse left-0 top-1 opacity-100",
                  subElements: [{
                    element: "div",
                    id: "appendOverlay",
                    attrs: { role: "dialog" },
                    class: "rounded-[10px] bg-white backdrop-filter-none relative max-w-[calc(-24px+100vw)] shadow-2xl overflow-hidden",
                  }]
                }]
              }]
            }]
          }]
        }]
      }]
    }
  }
  return overlayLayoutElTree
}

export default overlayLayoutEl

