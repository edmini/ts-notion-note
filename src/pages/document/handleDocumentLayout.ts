
import elementCreator from "../../static/creator.js"

const handleDocumentLayout = async () => {
  const { default: documentLayoutEl } = await import("./documentLayout.js")
  const { documentLayout } = elementCreator(documentLayoutEl())

  const { default: handleSidebarLayout } = await import("./sidebar/handleSidebarLayout.js")
  const sidebar = await handleSidebarLayout()
  const sidebarEl = documentLayout.element.querySelector("nav")
  sidebarEl?.appendChild(sidebar)

  //sidebar width
  const showHideSidebar = sidebar.querySelector("#showHideSidebar")

  const setSidebarWidth = (size: number): void => {
    const fullWidth = window.innerWidth
    const shSidebar = showHideSidebar as HTMLElement
    shSidebar!.style.width = `${size}px`
  }


  return documentLayout.element
}

export default handleDocumentLayout
