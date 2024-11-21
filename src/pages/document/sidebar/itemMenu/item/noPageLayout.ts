
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
  id: string
  icon: string
  title: string
  parentId: string | number
  level: number
  cover: string
}


const noPageLayoutEl = (data: Note): ElementLayout => {
  const noPageLayoutElTree: ElementLayout = {
    noPageLayoutEl: {
      element: "div",
      id: "noPage",
      attrs: { id: `noPage-${data.id}` },
      class: "flex",
      classes: [`ml-[${data.level * 8}px]`],
      subElements: [{
        element: "div",
        class: "flex flex-col gap-px",
        subElements: [{
          element: "div",
          class: "flex flex-col gap-px"
        }, {
          element: "div",
          class: "flex items-center w-full text-sm min-h-[27px] h-[30px] py-[5px] pr-2 pl-4",
          subElements: [{
            element: "div",
            class: "flex-auto whitespace-nowrap min-w-0 overflow-hidden text-ellipsis",
            subElements: [{
              element: "div",
              class: "text-notion-55/50 pl-4",
              text: "No page inside"
            }]
          }]
        }]
      }]
    }
  }
  return noPageLayoutElTree
}

export default noPageLayoutEl
