
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

interface Note {
  id: string
  icon: string
  title: string
  parentId: string | number
  level: number
  cover: string
  isFavorited: boolean
  isArchived: boolean
  isPublished: boolean
}


const noteTitleLayoutEl = (data: Note): ElementLayout => {
  const noteTitleLayoutElTree: ElementLayout = {
    noteTitleLayoutEl: {
      element: "div",
      attrs: { role: "button", tabindex: 0 },
      class: "select-none transition-[background] duration-[20ms] ease-in cursor-pointer inline-flex items-center shrink whitespace-nowrap h-6 rounded-md text-sm leading-[1.2] min-w-0 px-1.5 text-notion-55 hover:bg-notion-0/5",
      actions: {
        click: (e: Event | undefined): void => {
          e?.preventDefault()
          const rect = (e?.target as HTMLElement).getBoundingClientRect()
          console.log(rect.x, rect.y, data.title, data.icon)
        }
      },
      subElements: [{
        element: "div",//icon
        id: "isIcon",
        class: "items-center justify-center h-5 w-5 rounded-md shrink-0 mr-1.5",
        classes: data.icon.length > 0 ? ["flex"] : ["hidden"],
        subElements: [{
          element: "div",
          class: "flex items-center justify-center h-5 w-5",
          subElements: [{
            element: "div",
            class: "h-3.5 w-3.5 text-sm leading-none ml-0 text-notion-0",
            subElements: [{
              element: "span",
              id: "icon",
              class: "w-full h-full",
              text: data.icon
            }]
          }]
        }]
      }, {
        element: "div",
        id: "title",
        class: "whitespace-nowrap overflow-hidden text-ellipsis max-w-[240px]",
        text: data.title
      }]
    }
  }
  return noteTitleLayoutElTree
}

export default noteTitleLayoutEl

