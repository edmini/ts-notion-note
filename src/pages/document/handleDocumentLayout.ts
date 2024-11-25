
import elementCreator from "../../static/creator.js"

const handleDocumentLayout = async (id?: string): Promise<HTMLElement | SVGElement> => {
  const { default: documentLayoutEl } = await import("./documentLayout.js")
  const { documentLayout } = elementCreator(documentLayoutEl())

  const { default: handleNoteMainLayout } = await import("./main/note/handleNoteMainLayout.js")
  const { default: handleSidebarLayout } = await import("./sidebar/handleSidebarLayout.js")
  const { default: handleHeaderLayout } = await import("../../pages/document/header/handleHeaderLayout.js")
  const noteMainLayout = handleNoteMainLayout(id)
  const sidebarLayout = await handleSidebarLayout()
  const headerLayout = await handleHeaderLayout(id)

  const sidebarEl = documentLayout.element.querySelector("nav")
  const headerEl = documentLayout.element.querySelector("#header")
  const mainEl = documentLayout.element.querySelector("main")

  sidebarEl?.appendChild(sidebarLayout)
  headerEl?.replaceChildren(headerLayout)
  mainEl?.replaceChildren(noteMainLayout)

  //sidebar width
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

  return documentLayout.element
}

export default handleDocumentLayout

