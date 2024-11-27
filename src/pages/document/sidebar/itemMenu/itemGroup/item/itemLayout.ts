
interface ElementOptions {
  element: string
  class?: string
  classes?: string[]
  id?: string
  text?: string
  styles?: { [key: string]: string }
  attrs?: { [key: string]: any }
  attrsNS?: { [key: string]: any }
  actions?: { [key: string]: (e?: Event | undefined) => void }
  subElements?: ElementOptions | ElementOptions[]
}

interface ElementLayout {
  [LayoutEl: string]: ElementOptions
}

interface Note {
  _id: string
  icon: string
  title: string
  parentId: string | number
  level: number
  coverImage: string
  isFavorited: boolean
  isArchived: boolean
  isPublished: boolean
  content: string
  userId: string
  createdAt: Date
  row: number

}

const itemLayoutEl = (data: Note): ElementLayout => {

  const itemLayoutElTree: ElementLayout = {
    itemLayoutEl: {
      element: "div",
      attrs: { id: `id-${data._id}` },
      classes: data.level !== 0 ? ["hidden"] : ["flex"],
      class: "flex-col gap-px pb-0",
      subElements: [{
        element: "div",
        attrs: { role: "treeitem" },
        classes: [`pl-[${data.level * 8}px]`],
        class: "group/item flex text-inherit no-underline select-none transition-[background] duration-[150ms] cursor-pointer w-full rounded-md mx-0 hover:bg-notion-0/5",
        subElements: [{
          element: "a",
          attrs: { href: `/document/${data._id}`, "data-link": "spa-link" },
          class: "flex items-center w-full text-sm min-h-[27px] h-[30px] py-[5px] px-2 rounded-md",
          subElements: [{
            element: "div",//icon
            class: "flex items-center justify-center shrink-0 grow-0 w-[22px] h-[18px] mr-2 relative",
            subElements: [{
              element: "div",
              class: "gird",
              subElements: [{
                element: "div",//chevron icon
                id: "chevronBtn",
                class: "col-start-1, row-start-1 col-end-auto row-end-auto z-[1] opacity-0 transition-[opacity] duration-[150ms] order-0 hidden group-hover/item:block group-hover/item:opacity-100",
                subElements: [{
                  element: "div",
                  attrs: { role: "button", tabindex: 0 },
                  class: "select-none transition-[background] duration-[20ms] ease-in cursor-pointer relative flex items-center justify-center w-5 h-5 rounded hover:bg-notion-0/5",
                  subElements: [{
                    element: "svg",
                    id: "chevronIcon",
                    attrsNS: { viewBox: "0 0 12 12" },
                    class: "chevronIcon w-3 h-3 block fill-notion-55/35 shrink-0 transition-[transform] duration-[200ms] ease-out -rotate-[90deg] opacity-100",
                    subElements: [{
                      element: "path",
                      attrsNS: { d: "M6.02734 8.80274C6.27148 8.80274 6.47168 8.71484 6.66211 8.51465L10.2803 4.82324C10.4268 4.67676 10.5 4.49609 10.5 4.28125C10.5 3.85156 10.1484 3.5 9.72363 3.5C9.50879 3.5 9.30859 3.58789 9.15234 3.74902L6.03223 6.9668L2.90722 3.74902C2.74609 3.58789 2.55078 3.5 2.33105 3.5C1.90137 3.5 1.55469 3.85156 1.55469 4.28125C1.55469 4.49609 1.62793 4.67676 1.77441 4.82324L5.39258 8.51465C5.58789 8.71973 5.78808 8.80274 6.02734 8.80274Z" }
                    }]
                  }]
                }]
              }, {
                element: "div",
                class: "col-start-1 row-start-1 col-end-auto row-end-auto opacity-100 transition-[opacity] duration-[150ms] order-1 block group-hover/item:hidden group-hover/item:opacity-0",
                subElements: [{
                  element: "div",
                  class: "flex items-center justify-center h-5 w-5 rounded shrink-0",
                  subElements: [{
                    element: "span",
                    id: "sidebarIcon",
                    class: data.icon.length > 0 ? "block" : "hidden",
                    text: data.icon.length > 1 ? data.icon : ""
                  }, {
                    element: "svg",
                    attrsNS: { viewBox: "0 0 16 16" },
                    class: "w-4.5 h-4.5 block fill-notion-145 shrink-0",
                    classes: data.icon.length > 1 ? ["hidden"] : ["block"],
                    subElements: [{
                      element: "path",
                      attrsNS: { d: "M4.35645 15.4678H11.6367C13.0996 15.4678 13.8584 14.6953 13.8584 13.2256V7.02539C13.8584 6.0752 13.7354 5.6377 13.1406 5.03613L9.55176 1.38574C8.97754 0.804688 8.50586 0.667969 7.65137 0.667969H4.35645C2.89355 0.667969 2.13477 1.44043 2.13477 2.91016V13.2256C2.13477 14.7021 2.89355 15.4678 4.35645 15.4678ZM4.46582 14.1279C3.80273 14.1279 3.47461 13.7793 3.47461 13.1436V2.99219C3.47461 2.36328 3.80273 2.00781 4.46582 2.00781H7.37793V5.75391C7.37793 6.73145 7.86328 7.20312 8.83398 7.20312H12.5186V13.1436C12.5186 13.7793 12.1836 14.1279 11.5205 14.1279H4.46582ZM8.95703 6.02734C8.67676 6.02734 8.56055 5.9043 8.56055 5.62402V2.19238L12.334 6.02734H8.95703ZM10.4336 9.00098H5.42969C5.16992 9.00098 4.98535 9.19238 4.98535 9.43164C4.98535 9.67773 5.16992 9.86914 5.42969 9.86914H10.4336C10.6797 9.86914 10.8643 9.67773 10.8643 9.43164C10.8643 9.19238 10.6797 9.00098 10.4336 9.00098ZM10.4336 11.2979H5.42969C5.16992 11.2979 4.98535 11.4893 4.98535 11.7354C4.98535 11.9746 5.16992 12.1592 5.42969 12.1592H10.4336C10.6797 12.1592 10.8643 11.9746 10.8643 11.7354C10.8643 11.4893 10.6797 11.2979 10.4336 11.2979Z" }
                    }]
                  }]
                }]
              }]
            }]
          }, {
            element: "div",//title
            class: "pointer-events-none select-none flex-auto whitespace-nowrap min-w-0 overflow-hidden text-clip flex items-center",
            subElements: [{
              element: "div",
              id: "title",
              class: "select-none whitespace-nowrap overflow-hidden text-ellipsis font-medium",
              text: data.title//title
            }]
          }, {
            element: "div",//more plus
            class: "hidden items-center justify-center shrink-0 grow-0 h-full group-hover/item:flex",
            subElements: [{
              element: "div",
              class: "opacity-0 transition-[opacity] duration-[150ms] group-hover/item:opacity-100",
              subElements: [{
                element: "div",
                class: "flex pl-[3px]",
                subElements: [{
                  element: "div",
                  attrs: { role: "button", tabindex: "0" },
                  // id: "moreBtn",
                  class: "transition-[background] duration-[20ms] ease-in cursor-pointer flex items-center justify-center w-5 h-5 rounded ml-1 hover:bg-notion-0/5",
                  actions: {
                    click: (e?: Event | undefined): void => {
                      e?.preventDefault()
                      const rect = (e?.target as HTMLElement).getBoundingClientRect()
                      console.log(rect.x, rect.y)
                      console.log(data._id)
                    }
                  },
                  subElements: [{
                    element: "svg",
                    attrsNS: { viewBox: "0 0 13 3" },
                    class: "select-none pointer-events-none w-3.5 h-full block fill-notion-55/45 shrink-0",
                    subElements: [{
                      element: "path",
                      attrsNS: { d: "M3,1.5A1.5,1.5,0,1,1,1.5,0,1.5,1.5,0,0,1,3,1.5Z" }
                    }, {
                      element: "path",
                      attrsNS: { d: "M8,1.5A1.5,1.5,0,1,1,6.5,0,1.5,1.5,0,0,1,8,1.5Z" }
                    }, {
                      element: "path",
                      attrsNS: { d: "M13,1.5A1.5,1.5,0,1,1,11.5,0,1.5,1.5,0,0,1,13,1.5Z" }
                    }]
                  }]
                }, {
                  element: "div",
                  id: "plusBtn",
                  attrs: { role: "button", tabindex: "0" },
                  class: "transition-[background] duration-[20ms] ease-in cursor-pointer flex items-center justify-center w-5 h-5 rounded ml-1 hover:bg-notion-0/5",
                  subElements: [{
                    element: "svg",
                    attrsNS: { viewBox: "0 0 14 14" },
                    class: "select-none pointer-events-none w-3.5 h-full block fill-notion-55/45 shrink-0",
                    subElements: [{
                      element: "path",
                      attrsNS: { d: "M2 7.16357C2 7.59692 2.36011 7.95093 2.78735 7.95093H6.37622V11.5398C6.37622 11.9731 6.73022 12.3271 7.16357 12.3271C7.59692 12.3271 7.95093 11.9731 7.95093 11.5398V7.95093H11.5398C11.9731 7.95093 12.3271 7.59692 12.3271 7.16357C12.3271 6.73022 11.9731 6.37622 11.5398 6.37622H7.95093V2.78735C7.95093 2.36011 7.59692 2 7.16357 2C6.73022 2 6.37622 2.36011 6.37622 2.78735V6.37622H2.78735C2.36011 6.37622 2 6.73022 2 7.16357Z" }
                    }]
                  }]
                }]
              }]
            }]
          }]
        }]
      }]
    }
  }

  return itemLayoutElTree
}

export default itemLayoutEl
