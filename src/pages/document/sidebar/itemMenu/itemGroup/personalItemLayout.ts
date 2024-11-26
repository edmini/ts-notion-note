
import dataProxy from "../../../handleStorageData.js"
import { createItem } from "./item/handleItemLayout.js"

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


const personalItemLayoutEl = (): ElementLayout => {
  const personalItemLayoutElTree: ElementLayout = {
    personalItemLayoutEl: {
      element: "div",
      class: "mb-3 w-full flex flex-col gap-px",
      subElements: [{
        element: "div",// menu group title
        attrs: { role: "button", tabindex: 0 },
        class: "group/menuTitle select-none transition-[background] duration-[20ms] ease-in flex items-center rounded-md h-[30px] px-2 hover:bg-notion-0/5",
        subElements: [{
          element: "span",
          styles: { textTransform: "initial" },
          class: "text-xs leading-none text-notion-145 font-normal transition-[color] duration-[100ms] ease-out",
          text: "Personal"
        }, {
          element: "div",// more plus icon
          class: "ml-auto select-none",
          subElements: [{
            element: "div",
            class: "flex items-center opacity-0 transition-[opacity] duration-[150ms] group-hover/menuTitle:opacity-100",
            subElements: [{
              element: "div",//more btn
              attrs: { role: "button", tabindex: 0 },
              class: "select-none transition-[background] duration-[20ms] ease-in cursor-pointer flex items-center justify-center h-5 w-5 rounded hover:bg-notion-0/5",
              actions: {
                click: (e?: Event | undefined): void => {
                  e?.preventDefault()
                  const rect = (e?.target as HTMLElement).getBoundingClientRect()
                  console.log(rect.x, rect.y)
                }
              },
              subElements: [{
                element: "svg",
                attrsNS: { viewBox: "0 0 13 3" },
                class: "pointer-events-none w-3.5 h-3.5 block fill-notion-55/45 shrink-0",
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
              element: "div",//add new page btn
              // id: "prNewItemBtn",
              attrs: { role: "button", tabindex: 0 },
              class: "select-none transition-[background] duration-[20ms] ease-in cursor-pointer flex items-center justify-center h-5 w-5 rounded ml-1 hover:bg-notion-0/5",
              actions: {
                click: (e: Event | undefined) => {
                  e?.preventDefault()
                  const newData: Note = { _id: crypto.randomUUID(), icon: "", title: "Untitled", parentId: '0', level: 0, coverImage: "", isFavorited: false, isArchived: false, isPublished: false, content: "", userId: "신ED", createdAt: new Date(), row: 0 }
                  createItem(newData)
                  dataProxy.appendData = newData
                }
              },
              subElements: [{
                element: "svg",
                attrsNS: { viewBox: "0 0 14 14" },
                class: "pointer-events-none w-3.5 h-3.5 block fill-notion-55/45 shrink-0",
                subElements: [{
                  element: "path",
                  attrsNS: { d: "M2 7.16357C2 7.59692 2.36011 7.95093 2.78735 7.95093H6.37622V11.5398C6.37622 11.9731 6.73022 12.3271 7.16357 12.3271C7.59692 12.3271 7.95093 11.9731 7.95093 11.5398V7.95093H11.5398C11.9731 7.95093 12.3271 7.59692 12.3271 7.16357C12.3271 6.73022 11.9731 6.37622 11.5398 6.37622H7.95093V2.78735C7.95093 2.36011 7.59692 2 7.16357 2C6.73022 2 6.37622 2.36011 6.37622 2.78735V6.37622H2.78735C2.36011 6.37622 2 6.73022 2 7.16357Z" }
                }]
              }]
            }]
          }]
        }]
      }, {
        element: "div",//menus bottom
        class: "flex flex-col gap-px w-full",
        subElements: [{
          element: "div",//menu list
          attrs: { role: "tree" },
          class: "block",
          subElements: [{
            element: "div",
            id: "menuTree",
            class: "flex flex-col gap-px",
          }]
        }, {
          element: "div",//more item line
          attrs: { role: "button", tabindex: 0 },
          class: "hidden select-none transition-[background] duration-[150ms] cursor-pointer rounded-md flex mx-0 h-[30px]",
          text: "... More"
        }]
      }]
    }
  }
  return personalItemLayoutElTree
}


export default personalItemLayoutEl


