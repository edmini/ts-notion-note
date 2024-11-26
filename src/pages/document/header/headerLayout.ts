import noteTitleLayoutEl from "./noteTitleLayout.js"
import noteMoreLayoutEl from "./noteMoreLayout.js"
import homeMoreElTree from "./homeMoreLayout.js"

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

const headerLayoutEl = (data: Note): ElementLayout => {

  const headerLayoutElTree: ElementLayout = {
    headerLayoutEl: {
      element: "div",
      class: "contents",
      subElements: [{
        element: "div",
        class: "flex justify-between items-center overflow-hidden h-11  pl-3 pr-2.5",
        subElements: [{
          element: "div",
          id: "showSidebarIcon",
          class: "hidden shrink-0 w-12 h-12 -my-3 -mr-1.5 -ml-3 p-3",
          subElements: [{
            element: "div",
            class: "group/hamburger relative",
            subElements: [{
              element: "div",
              id: "showSidebarBtn",
              attrs: { role: "button", tabindex: "0" },
              class: "transition-[opacity] duration-[200ms] cursor-pointer absolute top-0 left-0 will-change-[opacity] flex items-center justify-center w-6 h-6 rounded opacity-100 group-hover/hamburger:opacity-0 hover:bg-notion-55/5",
              subElements: [{
                element: "svg",
                attrsNS: { viewBox: "0 0 14 14" },
                class: "pointer-events-none w-4 h-4 block fill-notion-55/85 shrink-0",
                subElements: [{
                  element: "path",
                  attrsNS: { d: "M0,1.25 L14,1.25 L14,2.75 L0,2.75 L0,1.25 Z M0,6.25 L14,6.25 L14,7.75 L0,7.75 L0,6.25 Z M0,11.25 L14,11.25 L14,12.75 L0,12.75 L0,11.25 Z" }
                }]
              }]
            }, {
              element: "div",
              attrs: { role: "button", tabindex: "0" },
              class: "select-none pointer-events-none transition-[opacity] duration-[200ms] cursor-pointer inline-flex items-center justify-center shrink-0 rounded-md h-6 w-6 p-0 absolute top-0 left-0 will-change-[opacity] bg-notion-55/5 opacity-0 group-hover/hamburger:opacity-100",
              subElements: [{
                element: "svg",
                attrsNS: { viewBox: "0 0 16 16" },
                class: "w-4 h-4 block fill-notion-55/85 shrink-0",
                subElements: [{
                  element: "path",
                  attrsNS: { d: "M2.25781 14.1211C2.47656 14.1211 2.66797 14.0391 2.81836 13.8887L8.14355 8.67969C8.32812 8.49512 8.41699 8.29688 8.41699 8.06445C8.41699 7.8252 8.32812 7.62012 8.14355 7.44922L2.81836 2.24023C2.66797 2.08984 2.4834 2.00781 2.25781 2.00781C1.81348 2.00781 1.46484 2.35645 1.46484 2.80078C1.46484 3.0127 1.55371 3.21777 1.7041 3.375L6.50977 8.05762L1.7041 12.7539C1.55371 12.9043 1.46484 13.1094 1.46484 13.3281C1.46484 13.7725 1.81348 14.1211 2.25781 14.1211ZM8.36914 14.1211C8.58789 14.1211 8.77246 14.0391 8.92285 13.8887L14.2549 8.67969C14.4395 8.49512 14.5283 8.29688 14.5283 8.06445C14.5283 7.8252 14.4326 7.62012 14.2549 7.44922L8.92285 2.24023C8.77246 2.08984 8.58789 2.00781 8.36914 2.00781C7.9248 2.00781 7.56934 2.35645 7.56934 2.80078C7.56934 3.0127 7.66504 3.21777 7.81543 3.375L12.6211 8.05762L7.81543 12.7539C7.66504 12.9043 7.56934 13.1094 7.56934 13.3281C7.56934 13.7725 7.9248 14.1211 8.36914 14.1211Z" }
                }]
              }]
            }]
          }]
        }, {
          element: "div",
          id: "titleEl",
          class: "flex items-center leading-[1.2] text-sm h-full grow-0 mr-2 min-w-0",
          subElements: data ? [noteTitleLayoutEl(data).noteTitleLayoutEl] : []
        }, {
          element: "div",
          class: "grow shrink"
        }, {
          element: "div",
          id: "headerMoreEl",
          subElements: data ? [noteMoreLayoutEl(data).noteMoreLayoutEl] : [homeMoreElTree.homeMoreEl]
        }]
      }]
    }
  }

  return headerLayoutElTree
}

export default headerLayoutEl

