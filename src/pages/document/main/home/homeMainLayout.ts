
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

const homeMainLayoutEl = (): ElementLayout => {
  const today = new Date()
  const hours = today.getHours()
  console.log(hours)
  const homeMainLayoutElTree: ElementLayout = {
    homeMainLayoutEl: {
      element: "div",
      class: "contents",
      subElements: [{
        element: "div",
        class: "z-[1] w-full h-full cursor-default overflow-x-hidden overflow-y-auto mr-0 mb-0",
        subElements: [{
          element: "div",
          class: "sticky z-[85] w-full top-0 left-0 height-0 flex-[0_1_0%]",
        }, {
          element: "div",
          id: "layoutHome",
          class: "layout layout-home pb-[160px] gap-[26px]",
          subElements: [{
            element: "div",
            class: "layout-full",
            subElements: [{
              element: "div",
              subElements: [{
                element: "div",
                class: "w-full h-full flex relative flex-col items-center justify-center opacity-100 transition-[opacity] duration-[0.5s] ease-in-out",
                subElements: [{
                  element: "div",
                  styles: { transition: "0.5s ease-in-out 2.75s", transform: "translateY(0px)" },
                  class: "w-full h-full mt-[64px] z-[1] pl-[52px] pr-[52px] pointer-events-none opacity-100",
                  subElements: [{
                    element: "div",
                    class: "w-full h-full text-[30px] leading-[1.2] font-semibold text-notion-55 flex items-center justify-center",
                    subElements: [{
                      element: "span",
                      class: "flex pointer-events-[all] max-w-full",
                      subElements: [{
                        element: "span",
                        class: "shink-0 pr-4",
                        text: hours > 12 ? "Good Afternoon " : "Good Morning " //"Good Morning"//Good Afternoon
                      }, {
                        element: "span",
                        text: " ED SHIN"
                      }]
                    }]
                  }]
                }, {
                  element: "div",
                  styles: { transition: "0.5s ease-in-out 2.75s", transform: "translateY(-12px)" },
                  class: "w-full h-full mt-[64px] z-[1] pl-[52px] pr-[52px] pointer-events-none opacity-0 absolute"
                }]
              }]
            }]
          }]
        }]
      }]
    }
  }
  return homeMainLayoutElTree
}

export default homeMainLayoutEl

