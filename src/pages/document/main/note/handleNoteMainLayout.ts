
import elementCreator from "../../../../static/creator.js"
import dataProxy from "../../handleStorageData.js"

import noteMainLayoutEl from "./noteMainLayout.js"
import coverLayoutEl from "./cover/coverLayout.js"
import toolbarLayoutEl from "./toolbar/toolbarLayout.js"

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

let coverState = false
let iconState = false

//emoji picker
const picker = new EmojiButton()

const { noteMainLayout } = elementCreator(noteMainLayoutEl())
const { coverLayout } = elementCreator(coverLayoutEl())
const { toolbarLayout } = elementCreator(toolbarLayoutEl())

const cover = coverLayout.element.querySelector("#cover")
const icon = toolbarLayout.element.querySelector("#icon")
const iconEl = toolbarLayout.element.querySelector("#iconEl")
const isIcon = toolbarLayout.element.querySelector("#isIcon")
const iconBtn = toolbarLayout.element.querySelector("#iconBtn")
const removeIconBtn = toolbarLayout.element.querySelector("#removeIconBtn")
const title = toolbarLayout.element.querySelector("#title")
const coverBtn = toolbarLayout.element.querySelector("#coverBtn")

const setCover = (coverImgLink?: string): void => {
  if (coverImgLink) {
    coverState = true
    coverBtn?.classList.add("hidden")
    coverLayout.element.classList.remove("hidden")
    iconState ? (iconEl as HTMLElement).style.marginTop = "-42px" : (iconEl as HTMLElement).style.marginTop = "96px";
    iconState ? (isIcon as HTMLElement).style.paddingTop = "8px" : (iconEl as HTMLElement).style.paddingTop = "16px";
    cover?.setAttribute("src", `https://lh3.googleusercontent.com/d/${coverImgLink}`)
  } else {
    coverState = false
    coverBtn?.classList.remove("hidden")
    coverLayout.element.classList.add("hidden")
    iconState ? (iconEl as HTMLElement).style.marginTop = "96px" : (iconEl as HTMLElement).style.marginTop = "-42px";
    iconState ? (isIcon as HTMLElement).style.paddingTop = "16px" : (iconEl as HTMLElement).style.paddingTop = "80px";
    cover?.setAttribute("src", "")
  }
}

export const setIcon = (iconStr?: string): void => {
  if (iconStr) {
    iconState = true
    iconEl?.classList.remove("hidden")
    iconBtn?.classList.add("hidden");
    coverState ? (iconEl as HTMLElement).style.marginTop = "-42px" : (iconEl as HTMLElement).style.marginTop = "96px";
    coverState ? (isIcon as HTMLElement).style.paddingTop = "8px" : (iconEl as HTMLElement).style.paddingTop = "16px";
    (icon as HTMLElement).innerText = iconStr
  } else {
    iconState = false
    iconEl?.classList.add("hidden")
    iconBtn?.classList.remove("hidden");
    coverState ? (iconEl as HTMLElement).style.marginTop = "96px" : (iconEl as HTMLElement).style.marginTop = "-42px";
    coverState ? (isIcon as HTMLElement).style.paddingTop = "16px" : (iconEl as HTMLElement).style.paddingTop = "80px";
    (icon as HTMLElement).innerText = ""
  }
}

export const setTitle = (titleStr?: string): void => {
  if (titleStr) {
    (title as HTMLElement).innerText = titleStr;
  } else {
    (title as HTMLElement).innerText = "";
  }
}

const setSidebarIcon = (iconStr?: string) => {
  const id = toolbarLayout.element.dataset.id
  const currentSidebar = document.querySelector(`#id-${id}`)
  const sidebarIcon = currentSidebar?.querySelector("#sidebarIcon")
  const sidebarIconNext = sidebarIcon?.nextSibling;
  sidebarIcon && (sidebarIcon as HTMLElement)?.innerText = iconStr;
  (sidebarIcon as HTMLElement).classList.contains("hidden") && (sidebarIcon as HTMLElement).classList.remove("hidden");
  !(sidebarIconNext as HTMLElement).classList.contains("hidden") && (sidebarIconNext as HTMLElement).classList.add("hidden");


}
const setSidebarTitle = (titleStr?: string) => {

}
const setHeaderIcon = (iconStr?: string) => {
  const headerIcon = document.querySelector("#headerIcon");
  const headerIsIcon = document.querySelector("#isIcon");
  headerIcon && (headerIcon as HTMLElement)?.innerText = iconStr;
  (headerIsIcon as HTMLElement).classList.contains("hidden") && (headerIsIcon as HTMLElement).classList.remove("hidden");
}
const setHeaderTitle = (titleStr?: string) => {
}


//update dataProxy
const updateDataProxy = (selector: string, value: string): void => {
  const id = toolbarLayout.element.dataset.id
  const row = toolbarLayout.element.dataset.row
  dataProxy.updateData = { row: row, id: id, selector: selector, value: value }
}

// file upload and setCover
const handleFile = (e: Event): void => {
  e.preventDefault()
  const fileSelector = document.createElement("input")
  let fileId = ""
  fileSelector.type = "file"
  fileSelector.setAttribute("name", "file")
  fileSelector.addEventListener("change", async (e) => {
    e.preventDefault()
    const file = e.target?.files[0]
    const uploadFile = new FormData()
    uploadFile.append("file", file)
    const res = await fetch("/api/imageUpload", {
      method: "POST",
      body: uploadFile,
    })
    const result = await res.json()
    console.log(result)
    if (result.status === 200) {
      fileId = result.imageId
      updateDataProxy("coverImage", fileId)
      setCover(fileId)
    } else {
      alert("Image upload fail")
    }
  })
  fileSelector.click()
}
//cover add
coverBtn?.addEventListener("click", async (e: Event) => {
  e.preventDefault()
  handleFile(e)
})

//emoji picker
picker.on("emoji", async (selection: string): Promise<void> => {
  setIcon(selection)
  setSidebarIcon(selection)
  setHeaderIcon(selection)
  updateDataProxy("icon", selection)
})
//icon Change
iconBtn?.addEventListener("click", (): void => {
  picker.togglePicker(iconBtn)
  document.querySelector(".wrapper")?.classList.add("z-[999]")
})
iconEl?.addEventListener("click", (): void => {
  picker.togglePicker(iconEl)
  document.querySelector(".wrapper")?.classList.add("z-[999]")
})
removeIconBtn?.addEventListener("click", (e) => {
  e.preventDefault()
  e.stopPropagation()
  setIcon()
  updateDataProxy("icon", "")
})

//Title Change
title?.addEventListener("mouseover", (e: Event): void => {
  e.preventDefault();
  (e.target as HTMLElement).contentEditable = 'true';
})
title?.addEventListener("click", (e: Event): void => {
  e.preventDefault();
  (e.target as HTMLElement).contentEditable = 'true';
})
title?.addEventListener("blur", (e: Event): void => {
  e.preventDefault();
  (e.target as HTMLElement).contentEditable = 'false';
  const newTitle = (e.target as HTMLElement).innerText
  updateDataProxy("title", newTitle)
})

const handleNoteMainLayout = (data: Note): HTMLElement | SVGElement => {

  toolbarLayout.element.setAttribute("data-id", data._id!)
  toolbarLayout.element.setAttribute("data-row", data.row.toString())

  setCover(data?.coverImage)
  setIcon(data?.icon)
  setTitle(data?.title)

  const coverEl = noteMainLayout.element.querySelector("#coverEl")
  const toolbarEl = noteMainLayout.element.querySelector("#toolbarEl")

  coverEl?.appendChild(coverLayout.element)
  toolbarEl?.appendChild(toolbarLayout.element)

  return noteMainLayout.element
}

export default handleNoteMainLayout

