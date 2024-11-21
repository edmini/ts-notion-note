
import elementCreator from "../../../../../static/creator.js"
import dataProxy from "../../../handleStorageData.js"

// import itemLayoutEl from "./itemLayout.js"
// import noPageLayoutEl from "./noPageLayout.js"

interface Note {
  id: string
  icon: string
  title: string
  parentId: string | number
  level: number
  cover: string
}

//create itembody
const itemBody = document.createElement("div")
itemBody.classList.add("flex", "flex-col", "gap-px")


const createItem = async (data: Note): Promise<void> => {
  const { default: itemLayoutEl } = await import("./itemLayout.js")
  const { default: noPageLayoutEl } = await import("./noPageLayout.js")

  const { itemLayout } = elementCreator(itemLayoutEl(data))
  itemLayout.element.setAttribute("id", `id-${data.id}`)

  const chevronBtn = itemLayout.element.querySelector("#chevronBtn")
  const chevronIcon = itemLayout.element.querySelector("#chevronIcon")
  const noPage = itemLayout.element.querySelector("#noPage")
  const plusBtn = itemLayout.element.querySelector("#plusBtn")

  const parentItem = itemBody.querySelector(`#id-${data.parentId}`)
  console.log(parentItem)


  if (data.level === 0) {
    console.log("parent id = 0 : ", data.parentId)
    itemBody.appendChild(itemLayout.element)
  } else {
    console.log("parent id ! 0 : ", parentItem)
    parentItem?.appendChild(itemLayout.element)
    const parentItemChevronIcon = parentItem?.querySelector("#chevronIcon")
    const parentChevronIconStatus = parentItemChevronIcon?.classList.contains("-rotate-[90deg]")
    parentChevronIconStatus && parentItemChevronIcon?.classList.remove("-rotate-[90deg]")
    const parent_childCount = parentItem?.childElementCount
    if (parent_childCount! == 1) {
      for (let i = 0; i < parent_childCount; i++) {
        parentItem?.children[i].classList.remove("hidden")
      }
    }
    const haveNoPage = itemBody.querySelector(`#${data.parentId}`)
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
    const newData = { id: crypto.randomUUID(), icon: "", title: "Untitle", parentId: data.id, level: data.level + 1, cover: "" }
    dataProxy.appendData = newData
    createItem(newData)
  })


  itemBody.appendChild(itemLayout.element)
}


const handleItemLayout = async (): Promise<HTMLElement | SVGElement> => {


  const datas = dataProxy.noteList
  datas?.map((data: Note): void => {
    createItem(data)
  })

  return itemBody
}

export default handleItemLayout
