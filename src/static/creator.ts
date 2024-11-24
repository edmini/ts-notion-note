
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

class CreateElement {
  element: HTMLElement | SVGElement

  constructor(element: ElementOptions) {
    if (element.element === 'svg' || element.element === 'path') {
      this.element = document.createElementNS("http://www.w3.org/2000/svg", element.element) as SVGElement
    } else {
      this.element = document.createElement(element.element) as HTMLElement
    }

    element.class && this.setClass(element.class)
    element.classes && this.setClasses(element.classes)
    element.id && this.setId(element.id)
    element.text && this.setText(element.text)
    element.styles && this.setStyles(element.styles)
    element.attrs && this.setAttrs(element.attrs)
    element.attrsNS && this.setAttrsNS(element.attrsNS)
    element.actions && this.setActions(element.actions)
    element.subElements && this.setSubElements(element.subElements)
  }

  setClass(tagClass: string): void {
    this.element.setAttribute("class", tagClass)
  }
  setClasses(classes: string[]): void {
    if (classes.length > 0) {
      classes.forEach((classStr: string): void => {
        this.element.classList.add(classStr)
      })
    }
  }
  setId(tagId: string): void {
    this.element.setAttribute("id", tagId)
  }
  setText(text: string): void {
    (this.element as HTMLElement).innerText = text
  }
  setStyles(styles: { [key: string]: string }): void {
    Object.keys(styles).forEach((key: string): void => {
      (this.element.style as any)[key] = styles[key]
    })
  }
  setAttrs(attrs: { [key: string]: any }): void {
    Object.keys(attrs).forEach((attr: string): void => {
      if (attr === "checked" && attrs[attr] === false) {
        return
      } else {
        this.element.setAttribute(attr, attrs[attr])
      }
    })
  }
  setAttrsNS(attrsNS: { [key: string]: any }): void {
    Object.keys(attrsNS).forEach((attr: string): void => {
      if (attr === "checked" && attrsNS[attr] === false) {
        return
      } else {
        this.element.setAttribute(attr, attrsNS[attr])
      }
    })
  }
  setActions(actions: { [key: string]: (e?: Event) => void }): void {
    Object.keys(actions).forEach((actionName: string): void => {
      this.element.addEventListener(actionName, (e: Event): void => {
        if (e) {
          actions[actionName](e)
        } else {
          actions[actionName]()
        }
      })
    })
  }
  setSubElements(subTag: ElementOptions | ElementOptions[]): void {
    if (Array.isArray(subTag)) {
      subTag.forEach(tag => {
        const child = new CreateElement(tag)
        this.element.appendChild(child.element)
      })
    } else {
      const child = new CreateElement(subTag)
      this.element.appendChild(child.element)
    }
  }
}

const elementCreator = (elTree: { [key: string]: ElementOptions }): { [key: string]: CreateElement } => {
  const tree: { [key: string]: CreateElement } = {}
  const elKeys = Object.keys(elTree)
  elKeys.forEach((elementName: string): void => {
    tree[elementName.slice(0, -2)] = new CreateElement(elTree[elementName])
  })
  return tree
}

export default elementCreator

