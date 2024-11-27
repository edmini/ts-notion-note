
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


const homeMoreLayoutEl = (): ElementLayout => {
  const homeMoreLayoutElTree: ElementLayout = {
    homeMoreLayoutEl: {
      element: "div",
      attrs: { role: "button", tabindex: "0" },
      actions: {
        click: (e?: Event | undefined): void => {
          e?.preventDefault()
          const rect = (e?.target as HTMLElement).getBoundingClientRect()
          console.log(rect.x, rect.y, "More Btn")
        }
      },
      class: "select-none transition-[background] duration-[20ms] ease-in cursor-pointer flex items-center justify-center w-8 h-7 rounded hover:bg-notion-0/5",
      subElements: [{
        element: "svg",
        attrsNS: { viewBox: "0 0 13 3" },
        class: "w-[18px] h-[18px] block fill-notion-55/85 shrink-0",
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
    }
  }
  return homeMoreLayoutElTree
}

export default homeMoreLayoutEl
