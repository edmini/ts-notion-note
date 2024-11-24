
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

const itemMenuLayoutEl = (): ElementLayout => {

  const itemMenuLayoutElTree: ElementLayout = {
    itemMenuLayoutEl: {
      element: "div",
      class: "z-[1] pt-1.5 grow overflow-x-hidden overflow-y-auto mr-0 mb-0",
      subElements: [{
        element: "div",
        class: "sticky z-[999] w-full top-0 left-0 h-0 flex-[0_1_0%]"
      }, {
        element: "div",
        class: "flex flex-col min-h-full",
        subElements: [{
          element: "div",
          class: "flex flex-col gap-3 px-2 pb-5",
          subElements: [{
            element: "div",
            class: "m-0 flex flex-col gap-1",
            subElements: [{
              element: "div",
              id: "itemGroup",
              class: "flex flex-col cursor-pointer",
              subElements: []
            }]
          }, {
            element: "div",//menus bottom
            class: "flex flex-col gap-px ",
            id: "bottomMenu",
          }]
        }, {
          element: "div",
          class: "sticky bottom-0 mt-auto"
        }]
      }, {
        element: "div",
        class: "sticky z-[999] w-full bottom-0 left-0 flex-[0_1_0%]"
      }]
    }
  }
  return itemMenuLayoutElTree
}

export default itemMenuLayoutEl
