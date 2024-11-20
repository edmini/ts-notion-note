
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

interface Menu {
  id: number
  href?: string
  title: string
  viewBox: string
  classes?: string[]
  path: Path[]
}
interface Path {
  d: string
  "fill-rule"?: string | undefined
  "clip-rule"?: string | undefined
}

const menuPathEl = (path: Path): ElementLayout => {
  const menuPathElTree: ElementLayout = {
    menuPathEl: {
      element: "path",
      attrsNS: {
        d: path.d,
        "fill-rule": path["fill-rule"] ? path["fill-rule"] : null,
        "clip-rule": path["clip-rule"] ? path["clip-rule"] : null
      },
    }
  }
  return menuPathElTree
}

const menusLayoutEl = (menu: Menu): ElementLayout => {
  const pathEl = menu.path.map((path: Path) => {
    const temp = menuPathEl(path)
    return temp.menuPathEl
  })

  const menusLayoutElTree: ElementLayout = {
    menusLayoutEl: {
      element: menu.href ? "a" : "div",
      attrs: { role: "button", tabindex: 0, href: menu.href ? menu.href : null, "data-link": "spa-link" },
      class: "select-none transition-[background] duration-[150ms] cursor-pointer rounded-md flex mx-0 font-medium hover:bg-notion-0/5",
      subElements: [{
        element: "div",
        class: "pointer-events-none flex items-center w-full text-sm min-h-[27px] h-[30px] py-1 px-2",
        subElements: [{
          element: "div",//menu icon
          class: "shrink-0 grow-0 rounded text-notion-55/65 w-[22px] h-[22px] flex items-center justify-center mr-2",
          subElements: [{
            element: "svg",
            attrsNS: { viewBox: menu.viewBox },
            class: "block fill-notion-145 shrink-0",
            classes: menu.classes,
            subElements: pathEl
          }]
        }, {
          element: "div",//menu title
          class: "flex-auto whitespace-nowrap min-w-0 overflow-hidden text-ellipsis",
          text: `<span>${menu.title}</span>`
        }]
      }]
    }
  }
  return menusLayoutElTree
}

export default menusLayoutEl

