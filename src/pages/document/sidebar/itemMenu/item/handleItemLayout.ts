
import elementCreator from "../../../../../static/creator.js"
import dataProxy from "../../../handleStorageData.js"

import itemLayoutEl from "./itemLayout.js"
import noPageLayoutEl from "./noPageLayout.js"

interface Note {
  id: string
  icon: string
  title: string
  parentId: string | number
  level: number
  cover: string
  subItem?: boolean
}

//create itembody
const itemBody = document.createElement("div")
itemBody.classList.add("flex", "flex-col", "gap-px")

export const createItem = (data: Note): void => {

  const { itemLayout } = elementCreator(itemLayoutEl(data))

  const chevronBtn = itemLayout.element.querySelector("#chevronBtn")
  const chevronIcon = itemLayout.element.querySelector("#chevronIcon")
  const noPage = itemLayout.element.querySelector("#noPage")
  const plusBtn = itemLayout.element.querySelector("#plusBtn")

  const parentItem = data.parentId !== 0 ? itemBody.querySelector(`#id-${data.parentId}`) : null
  parentItem ? parentItem?.appendChild(itemLayout.element) : itemBody.appendChild(itemLayout.element)

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
    const haveNoPage = itemBody.querySelector(`#noPage-${data.parentId}`)
    haveNoPage && haveNoPage.remove()
  }

  //chevronBtn click
  chevronBtn?.addEventListener("click", (e) => {
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
  plusBtn?.addEventListener("click", (e) => {
    e.preventDefault()
    const newData = { id: crypto.randomUUID(), icon: "", title: "Untitle", parentId: data.id, level: data.level + 1, cover: "", subItem: true }
    dataProxy.appendData = newData
    createItem(newData)
  })
}

const datas = dataProxy.noteList
datas?.map((data: Note): void => {
  createItem(data)
})

const handleItemLayout = async (): Promise<HTMLElement | SVGElement> => {
  return itemBody
}

export default handleItemLayout

