
import dataProxy from "../../handleStorageData.js"
import { createItem } from "../itemMenu/itemGroup/item/handleItemLayout.js"

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

const profileLayoutEl = (): ElementLayout => {

  const profileLayoutElTree: ElementLayout = {
    profileLayoutEl: {
      element: "div",
      attrs: { role: "button", tabindex: "0" },
      class: "select-none transition-[background] duration-[20ms] ease-in cursor-pointer flex items-center min-w-0 h-8 w-auto my-1.5 mx-2 rounded-md p-0 hover:bg-notion-0/5",
      actions: {
        click: (e?: Event | undefined): void => {
          e?.preventDefault()
          const rect = (e?.target as HTMLElement).getBoundingClientRect()
          console.log(rect.x, rect.y)
        }
      },
      subElements: [{
        element: "div",//photo name
        class: "flex items-center w-full text-sm min-h-[27px] h-[30px] py-1 px-2 overflow-hidden ml-0",
        subElements: [{
          element: "div",//photo
          class: "shrink-0 grow-0 rounded text-notion-55/65 w-[22px] h-[22px] flex items-center justify-center mr-2",
          subElements: [{
            element: "div",
            class: "relative",
            subElements: [{
              element: "div",
              class: "flex items-center justify-center h-[22px] w-[22px] rounded shrink-0 mt-px text-notion-55 font-medium",
              subElements: [{
                element: "div",
                subElements: [{
                  element: "div",
                  class: "w-full h-full",
                  subElements: [{
                    element: "img",
                    attrs: { src: "https://lh3.googleusercontent.com/a/ACg8ocIYy04dMNMVLb8A5lDDL55gS_U_3H5zBRPiKn7rusZjyNI=s100", referrerpolicy: "no-referrer" },
                    class: "block object-cover rounded w-5 h-5 transition-[opacity] duration-[100ms] ease-out"
                  }]
                }]
              }]
            }]
          }]
        }, {
          element: "div",//name
          class: "flex-auto whitespace-nowrap min-w-0 overflow-hidden text-ellipsis",
          subElements: [{
            element: "div",
            class: "flex items-center justify-start",
            subElements: [{
              element: "div",
              class: "flex flex-col mr-1.5 mt-0 whitespace-nowrap overflow-hidden text-ellipsis",
              subElements: [{
                element: "div",
                class: "text-notion-55 font-medium whitespace-nowrap overflow-hidden text-ellipsis leading-5",
                text: "ED Shin's Notion"
              }, {
                element: "div",
                class: "text-notion-55/65 text-[11px] leading-4 font-normal whitespace-nowrap overflow-hidden text-ellipsis"
              }]
            }, {
              element: "div",
              class: "grow-0 shrink-0 w-2.5 h-2.5 ml-0.5 fill-notion-55/45",
              subElements: [{
                element: "svg",
                attrsNS: { viewBox: "0 0 15 9" },
                class: "w-full h-full block fill-inherit shrink-0",
                subElements: [{
                  element: "path",
                  attrsNS: { d: "M7.92188 8.65625C8.19531 8.64844 8.44531 8.54688 8.64844 8.32812L14.5859 2.25C14.7578 2.07812 14.8516 1.85938 14.8516 1.60156C14.8516 1.08594 14.4453 0.671875 13.9297 0.671875C13.6797 0.671875 13.4375 0.773438 13.2578 0.953125L7.92969 6.42969L2.58594 0.953125C2.40625 0.78125 2.17188 0.671875 1.91406 0.671875C1.39844 0.671875 0.992188 1.08594 0.992188 1.60156C0.992188 1.85938 1.08594 2.07812 1.25781 2.25L7.20312 8.32812C7.41406 8.54688 7.64844 8.65625 7.92188 8.65625Z" }
                }]
              }]
            }]
          }]
        }]
      }, {
        element: "div",//icons
        class: "flex items-center h-full ml-auto mr-0",
        subElements: [{
          element: "div",
          class: "inline-flex mr-0.5",
          subElements: [{
            element: "div",//chevron left icon
            id: "hideSidebarBtn",
            attrs: { role: "button", tabindex: "-1" },
            class: "select-none transition-[opacity] duration-[200ms] cursor-default inline-flex items-center justify-center shrink-0 rounded h-7 w-7 p-0 relative ml-2.5 fill-notion-55/45 mr-1 opacity-0 group-hover/sidebar:opacity-100 hover:bg-notion-0/5",
            subElements: [{
              element: "svg",
              attrsNS: { viewBox: "0 0 16 16" },
              class: "w-4 h-4 block fill-inherit shrink-0",
              subElements: [{
                element: "path",
                attrsNS: { d: "M7.07031 13.8887C7.2207 14.0391 7.40527 14.1211 7.62402 14.1211C8.06836 14.1211 8.41699 13.7725 8.41699 13.3281C8.41699 13.1094 8.32812 12.9043 8.17773 12.7539L3.37207 8.05762L8.17773 3.375C8.32812 3.21777 8.41699 3.0127 8.41699 2.80078C8.41699 2.35645 8.06836 2.00781 7.62402 2.00781C7.40527 2.00781 7.2207 2.08984 7.07031 2.24023L1.73828 7.44922C1.56055 7.62012 1.46484 7.8252 1.46484 8.06445C1.46484 8.29688 1.55371 8.49512 1.73828 8.67969L7.07031 13.8887ZM13.1748 13.8887C13.3252 14.0391 13.5098 14.1211 13.7354 14.1211C14.1797 14.1211 14.5283 13.7725 14.5283 13.3281C14.5283 13.1094 14.4395 12.9043 14.2891 12.7539L9.4834 8.05762L14.2891 3.375C14.4395 3.21777 14.5283 3.0127 14.5283 2.80078C14.5283 2.35645 14.1797 2.00781 13.7354 2.00781C13.5098 2.00781 13.3252 2.08984 13.1748 2.24023L7.84961 7.44922C7.66504 7.62012 7.57617 7.8252 7.56934 8.06445C7.56934 8.29688 7.66504 8.49512 7.84961 8.67969L13.1748 13.8887Z" }
              }]
            }]
          }, {
            element: "div",// new item icon
            id: "newItemBtn",
            actions: {
              click: (e: Event | undefined): void => {
                e?.preventDefault()
                const newData: Note = { id: crypto.randomUUID(), icon: "", title: "Untitled", parentId: 0, level: 0, cover: "", isFavorited: false, isArchived: false, isPublished: false }
                createItem(newData)
                dataProxy.appendData = newData
              },
            },
            attrs: { role: "button", tabindex: "0" },
            class: "select-none transition-[background] duration-[20ms] ease-in cursor-pointer inline-flex items-center justify-center shrink-0 rounded h-7 w-7 p-0 hover:bg-notion-0/5",
            subElements: [{
              element: "svg",
              attrsNS: { viewBox: "0 0 24 24" },
              class: "w-6 h-6 block fill-notion-55 shrink-0",
              subElements: [{
                element: "path",
                attrsNS: { "fill-rule": "evenodd", d: "M9.944 14.721c.104.094.216.12.336.079l1.703-.688 6.844-6.844-1.406-1.398-6.836 6.836-.711 1.68c-.052.13-.029.242.07.335zm8.102-9.484l1.414 1.406.515-.523a.917.917 0 00.282-.633.76.76 0 00-.258-.61l-.25-.25a.702.702 0 00-.578-.187.975.975 0 00-.617.297l-.508.5zm-9.453.127a3.85 3.85 0 00-3.85 3.85v6.5a3.85 3.85 0 003.85 3.85h6.5a3.85 3.85 0 003.85-3.85V12.95a.85.85 0 10-1.7 0v2.764a2.15 2.15 0 01-2.15 2.15h-6.5a2.15 2.15 0 01-2.15-2.15v-6.5a2.15 2.15 0 012.15-2.15h3.395a.85.85 0 000-1.7H8.593z", "clip-rule": "evenodd" }
              }]
            }]
          }]
        }]
      }]
    }
  }
  return profileLayoutElTree
}

export default profileLayoutEl
