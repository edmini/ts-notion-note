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

const homeLayoutEl = (): ElementLayout => {
  const homeLayoutElTree: ElementLayout = {
    homeLayoutEl: {
      element: "div",
      class: "flex flex-col items-center justify-center h-screen w-screen",
      subElements: [{
        element: "h1",
        class: "text-8xl font-black text-gray-600",
        text: "Home Page"
      }, {
        element: "a",
        attrs: { href: "/document", "data-link": "spa-link" },
        class: "group/link mt-5 flex flex-row font-bold text-gray-500 text-lg",
        text: "Go to note page",
        subElements: [{
          element: "svg",
          class: "w-6 h-6 text-gray-600 ml-2 group-hover/link:text-red-500",
          attrsNS: { viewBox: "0 0 24 24", fill: "none" },
          subElements: [{
            element: "path",
            attrsNS: {
              d: "M19 12H5m14 0-4 4m4-4-4-4",
              stroke: "currentColor",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "3"
            }
          }]
        }]
      }]
    }
  }

  return homeLayoutElTree
}

export default homeLayoutEl
