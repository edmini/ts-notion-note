
import { connectors } from "googleapis/build/src/apis/connectors/index.js"
import elementCreator from "../../../../../../static/creator.js"
import dataProxy from "../../../../handleStorageData.js"

import itemLayoutEl from "./itemLayout.js"
import noPageLayoutEl from "./noPageLayout.js"

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

  subItem?: boolean
}

//create itembody
const itemBodyEl = (): ElementLayout => {
  const itemBodyElTree: ElementLayout = {
    itemBodyEl: {
      element: "div",
      class: "flex flex-col gap-px"
    }
  }
  const itemBodyEl = { ...itemBodyElTree.itemBodyEl }
  return { itemBodyEl }
}
const { itemBody } = elementCreator(itemBodyEl())

export const createItem = (data: Note): void => {

  const { itemLayout } = elementCreator(itemLayoutEl(data))

  const chevronBtn = itemLayout.element.querySelector("#chevronBtn")
  const chevronIcon = itemLayout.element.querySelector("#chevronIcon")
  const noPage = itemLayout.element.querySelector("#noPage")
  const plusBtn = itemLayout.element.querySelector("#plusBtn")

  const parentItem = data.parentId !== '0' ? itemBody.element.querySelector(`#id-${data.parentId}`) : null
  parentItem ? parentItem?.appendChild(itemLayout.element) : itemBody.element.appendChild(itemLayout.element)

  if (data.subItem) {
    const parentItemChevronIcon = parentItem?.querySelector("#chevronIcon")
    const parentChevronIconStatus = parentItemChevronIcon?.classList.contains("-rotate-[90deg]")
    parentChevronIconStatus && parentItemChevronIcon?.classList.remove("-rotate-[90deg]")
    const parent_childCount = parentItem?.childElementCount
    if (parent_childCount !== 1) {
      for (let i = 0; i < parent_childCount!; i++) {
        parentItem?.children[i].classList.remove("hidden")
      }
    }
    const haveNoPage = itemBody.element.querySelector(`#noPage-${data.parentId}`)
    haveNoPage && haveNoPage.remove()
  }

  //chevronBtn click
  chevronBtn?.addEventListener("click", (e: Event): void => {
    e.preventDefault()
    const childCount = itemLayout.element.childElementCount
    chevronIcon?.classList.toggle("-rotate-[90deg]")
    if (childCount !== 1 && !noPage) {
      for (let i = 1; i < childCount; i++) {
        itemLayout.element.children[i].classList.toggle("hidden")
      }
    } else {
      const { noPageLayout } = elementCreator(noPageLayoutEl(data))
      itemLayout.element.appendChild(noPageLayout.element)
    }
  })

  //plusBtn click
  plusBtn?.addEventListener("click", (e: Event): void => {
    e.preventDefault()
    const newData = { _id: crypto.randomUUID(), icon: "", title: "Untitled", parentId: data._id, level: data.level + 1, coverImage: "", isFavorited: false, isArchived: false, isPublished: false, content: "", userId: "신ED", createdAt: new Date(), row: 0, subItem: true }
    dataProxy.appendData = newData
    createItem(newData)
  })
}

const datas = dataProxy.noteList
datas?.map((data: Note): void => {
  createItem(data)
})

const handleItemLayout = (): HTMLElement | SVGElement => {

  return itemBody.element
}

export default handleItemLayout

