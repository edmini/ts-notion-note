
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

const coverLayoutEl = (): ElementLayout => {
  const coverLayoutElTree: ElementLayout = {
    coverLayoutEl: {
      element: "div",
      id: "isCover",
      class: "group/cover select-none w-full flex flex-col items shrink-0 grow-0 z-[2]",
      subElements: [{
        element: "div",
        class: "relative w-full z-[1] flex flex-col items-center h-[30vh] max-h-[280px] cursor-default",
        subElements: [{
          element: "div",
          class: "w-full cursor-inherit",//cursor-move when reposition
          subElements: [{
            element: "div",
            class: "grid w-full h-[30vh] max-h-[280px]",
            subElements: [{
              element: "div",
              class: "row-start-1 col-start-1 row-end-auto col-end-auto w-full h-full",
              subElements: [{
                element: "img",
                id: "cover",
                attrs: { src: "", alt: "cover image", referrerpolicy: "no-referrer" },
                styles: { objectPosition: "center 80%" },
                class: "block object-cover rounded-none w-full h-[30vh] max-h-[280px] opacity-100"
              }]
            }]
          }]
        }, {
          element: "div",//drag node
          id: "dragImage",
          class: "bg-notion-0/5 rounded text-white text-sm w-[180px] left-[calc(50%-90px)] py-[0.3em] px-6 pointer-events-auto absolute top-[calc(50%-10px)] text-center opacity-100 hidden transition-[opacity] duration-[200ms] ease",
          text: "Drag image to reposition",
          subElements: [{
            element: "span",
            class: "pointer-events-none text-white block",
          }]
        }, {
          element: "div",//change cover and position
          class: "absolute pointer-events-auto max-w-full top-12 w-[900px] opacity-100 transition-[opacity] duration-[200ms] ease",
          subElements: [{
            element: "div",
            class: "text-notion-55/65 fill-notion-55/65 text-xs bg-white shadow flex whitespace-nowrap rounded max-w-[calc(100%-16px)] min-h-6 overflow-hidden pointer-events-auto opacity-0 absolute right-2 bottom-2 z-[2] mr-[calc(96px+env(safe-area-inset-right)] ml-[calc(96px+env(safe-area-inset-left)] transition-[opacity] duration-[200ms] ease group-hover/cover:opacity-100",
            subElements: [{
              element: "div",
              id: "changeCoverBtn",
              attrs: { role: "button", tabindex: 0 },
              class: "select-none transition-[background] duration-[20ms] ease-in cursor-pointer border-r border-notion-55/10 flex items-center justify-center py-1 px-1.5 font-normal text-notion-55 fill-notion-55/65 hover:bg-notion-0/5",
              text: "Change cover"
            }, {
              element: "div",
              id: "repositionBtn",
              attrs: { role: "button", tabindex: 0 },
              class: "select-none transition-[background] duration-[20ms] ease-in cursor-pointer flex items-center justify-center py-1 px-1.5 font-normal text-notion-55 fill-notion-55/65 hover:bg-notion-0/5",
              text: "Reposition"
            }]

          }]
        }]
      }]
    }
  }
  return coverLayoutElTree
}

export default coverLayoutEl

