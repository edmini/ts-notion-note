
import elementCreator from "../../../../../static/creator.js"
import dataProxy from "../../../handleStorageData.js"

interface Note {
  id: string
  icon: string
  title: string
  parentId: string | number
  level: number
  cover: string
}


const handleItemLayout = async (): Promise<HTMLElement | SVGElement> => {
  const { default: itemLayoutEl } = await import("./itemLayout.js")
  const { default: dataProxy } = await import("../../../handleStorageData.js")

  //create itembody
  const itemBody = document.createElement("div")
  itemBody.classList.add("flex", "flex-col", "gap-px")


  const createItem = (data: Note) => {
    const { itemLayout } = elementCreator(itemLayoutEl(data))

    const chevronBtn = itemLayout.element.querySelector("#chevronBtn")
    const chevronIcon = itemLayout.element.querySelector("#chevronIcon")
    const plusBtn = itemLayout.element.querySelector("#plusBtn")

    chevronBtn?.addEventListener("click", (e) => {
      e.preventDefault()
      const childCount = itemLayout.element.childElementCount
      chevronIcon?.classList.toggle("-rotate-[90deg]")
    })

    plusBtn?.addEventListener("click", (e) => {
      e.preventDefault()
      const newData = { id: crypto.randomUUID(), icon: "", title: "Untitle", parentId: data.id, level: data.level + 1, cover: "" }
      dataProxy.appendData = newData
      createItem(newData)
    })






    itemBody.appendChild(itemLayout.element)
  }

  const datas = dataProxy.noteList
  datas?.map((data: Note) => {
    createItem(data)
  })

  return itemBody
}

export default handleItemLayout
