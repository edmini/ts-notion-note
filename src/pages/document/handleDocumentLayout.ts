
import elementCreator from "../../static/creator.js"
import dataProxy from "./handleStorageData.js"

const handleDocumentLayout = async (id?: string): Promise<HTMLElement | SVGElement> => {

  const data = dataProxy.noteList?.filter((data) => data._id === id)

  const { default: documentLayoutEl } = await import("./documentLayout.js")
  const { documentLayout } = elementCreator(documentLayoutEl())

  const { default: handleNoteMainLayout } = await import("./main/note/handleNoteMainLayout.js")
  const { default: handleSidebarLayout } = await import("./sidebar/handleSidebarLayout.js")
  const { default: handleHeaderLayout } = await import("../../pages/document/header/handleHeaderLayout.js")
  const sidebarLayout = await handleSidebarLayout()
  const headerLayout = await handleHeaderLayout(data![0])

  const sidebarEl = documentLayout.element.querySelector("nav")
  const headerEl = documentLayout.element.querySelector("#header")
  const mainEl = documentLayout.element.querySelector("main")

  sidebarEl?.appendChild(sidebarLayout)
  headerEl?.replaceChildren(headerLayout)

  if (id) {
    //noteMain append
    const noteMainLayout = handleNoteMainLayout(data![0])
    mainEl?.replaceChildren(noteMainLayout)

    //overlay
    const { default: handleOverlayLayout } = await import("./overlay/handleOverlayLayout.js")
    const overlay = documentLayout.element.querySelector("#overlay")
    const noteTitle = documentLayout.element.querySelector("#noteTitle")
    noteTitle?.addEventListener("click", async (e: Event): Promise<void> => {
      e?.preventDefault()
      e?.stopPropagation()
      const rect = (e?.target as HTMLElement).getBoundingClientRect()
      const overlayLayout = await handleOverlayLayout({ left: Math.round(rect.x), top: Math.round(rect.y) })
      const { default: handleOverlayHeaderTitleLayout } = await import("./overlay/headerTitle/handleOverlayHeaderTitleLayout.js")
      const overlayHeaderTitleLayout = await handleOverlayHeaderTitleLayout(data![0])
      const appendOverlay = overlayLayout.querySelector("#appendOverlay")
      appendOverlay?.appendChild(overlayHeaderTitleLayout)
      overlay?.appendChild(overlayLayout)
    })


  } else {
    //homeMain append
  }

  //sidebar width start
  const showHideSidebar = sidebarLayout.querySelector("#showHideSidebar")
  const hideSidebarBtn = sidebarLayout.querySelector("#hideSidebarBtn")
  const showSidebarIcon = headerLayout.querySelector("#showSidebarIcon")
  const showSidebarBtn = headerLayout.querySelector("#showSidebarBtn")
  const sidebarResize = sidebarLayout.querySelector("#sidebarResize")

  const setSidebarWidth = (size: number): void => {
    (sidebarEl as HTMLElement).style.width = `${size}px`;
    (showHideSidebar as HTMLElement).style.width = `${size}px`;
  }
  const handleResize = (): void => {
    document.addEventListener("mousemove", resize, false)
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", resize, false)
    }, false)
  }
  const resize = (e: MouseEvent): void => {
    let size = 240
    if ((e as MouseEvent).x < 240 || (e as MouseEvent).x > 480) {
      if ((e as MouseEvent).x < 240) size = 240
      if ((e as MouseEvent).x > 480) size = 480
    } else {
      size = (e as MouseEvent).x
    }
    setSidebarWidth(size)
  }

  hideSidebarBtn?.addEventListener("click", (e: Event): void => {
    e.stopPropagation()
    e.preventDefault()
    setSidebarWidth(0);
    (showSidebarIcon as HTMLElement).classList.remove("hidden");
  })
  showSidebarBtn?.addEventListener("click", (e: Event): void => {
    e.stopPropagation()
    e.preventDefault()
    setSidebarWidth(240);
    (showSidebarIcon as HTMLElement).classList.add("hidden");
  })
  sidebarResize?.addEventListener("mousedown", handleResize)
  //sidebar width end



  return documentLayout.element
}

export default handleDocumentLayout

