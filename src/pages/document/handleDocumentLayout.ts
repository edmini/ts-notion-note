
import elementCreator from "../../static/creator.js"
import dataProxy from "./handleStorageData.js"

const handleDocumentLayout = async (id?: string): Promise<HTMLElement | SVGElement> => {

  const SIDEBAR_DEFAULT_WIDTH = 240
  const SIDEBAR_MAX_WIDTH = 480
  const SIDEBAR_MIN_WIDTH = 0

  const data = dataProxy.noteList?.filter((data) => data._id === id)

  const { default: documentLayoutEl } = await import("./documentLayout.js")
  const { documentLayout } = elementCreator(documentLayoutEl())

  const { default: handleNoteMainLayout, setIcon, setTitle } = await import("./main/note/handleNoteMainLayout.js")
  const { default: handleSidebarLayout } = await import("./sidebar/handleSidebarLayout.js")
  const { default: handleHeaderLayout } = await import("../../pages/document/header/handleHeaderLayout.js")
  const sidebarLayout = await handleSidebarLayout()
  const headerLayout = await handleHeaderLayout(data![0])

  const sidebarEl = documentLayout.element.querySelector("nav")
  const headerEl = documentLayout.element.querySelector("#header")
  const mainEl = documentLayout.element.querySelector("main")

  sidebarEl?.replaceChildren(sidebarLayout)
  headerEl?.replaceChildren(headerLayout)

  if (!id) {
    const { default: handleHomeMainLayout } = await import("./main/home/handleHomeMainLayout.js")
    const homeMainLayout = await handleHomeMainLayout()
    mainEl?.replaceChildren(homeMainLayout)
    //homeMain append
    //
  } else {
    //noteMain append
    const noteMainLayout = handleNoteMainLayout(data![0])
    mainEl?.replaceChildren(noteMainLayout)

    const changeIcon = (selection: string, overlayLayout: HTMLElement | SVGElement): void => {
      const overlayHeaderIcon = overlayLayout.querySelector("#overlayHeaderIcon")
      const headerIcon = headerLayout.querySelector("#headerIcon")
      const headerIsIcon = headerLayout.querySelector("#isIcon")
      const currentSidebar = sidebarLayout.querySelector(`#id-${data![0]._id}`)
      const sidebarIcon = currentSidebar?.querySelector("#sidebarIcon")
      const sidebarIconNext = sidebarIcon?.nextSibling;
      (overlayHeaderIcon as HTMLElement).innerText = selection;
      (headerIcon as HTMLElement).innerText = selection;
      (sidebarIcon as HTMLElement).innerText = selection;
      (headerIsIcon as HTMLElement).classList.contains("hidden") && (headerIsIcon as HTMLElement).classList.remove("hidden");
      (sidebarIcon as HTMLElement).classList.contains("hidden") && (sidebarIcon as HTMLElement).classList.remove("hidden");
      !(sidebarIconNext as HTMLElement).classList.contains("hidden") && (sidebarIconNext as HTMLElement).classList.add("hidden");
    }

    //overlay header title
    const overlay = documentLayout.element.querySelector("#overlay")
    const noteTitle = documentLayout.element.querySelector("#noteTitle")

    noteTitle?.addEventListener("click", async (e: Event): Promise<void> => {
      e?.preventDefault()
      e?.stopPropagation()

      const rect = (e?.target as HTMLElement).getBoundingClientRect()
      const { default: handleOverlayLayout } = await import("./overlay/handleOverlayLayout.js")
      const { default: handleOverlayHeaderTitleLayout } = await import("./overlay/headerTitle/handleOverlayHeaderTitleLayout.js")

      const overlayLayout = await handleOverlayLayout({ left: Math.round(rect.x - (rect.x > SIDEBAR_DEFAULT_WIDTH ? 150 : 60)), top: Math.round(rect.y + 20) })
      const overlayHeaderTitleLayout = await handleOverlayHeaderTitleLayout(data![0])

      const appendOverlay = overlayLayout.querySelector("#appendOverlay")
      const overlayHeaderIconBtn = overlayHeaderTitleLayout.querySelector("#overlayHeaderIconBtn")

      //overlay icon change button event
      overlayHeaderIconBtn?.addEventListener("click", (e: Event): void => {
        e?.preventDefault()
        e?.stopPropagation()
        const picker = new EmojiButton()
        picker.on("emoji", (selection: string): void => {
          dataProxy.updateData = { row: data![0].row, id: data![0]._id, selector: "icon", value: selection };
          changeIcon(selection, overlayLayout)
          setIcon(selection)
        })

        picker.togglePicker(e?.target)
        document.querySelector(".wrapper")?.classList.add("z-[999]")
      })
      //overlay title change button event
      const overlayHeaderTitle = overlayHeaderTitleLayout.querySelector("#overlayHeaderTitle")
      const headerTitle = headerLayout.querySelector("#headerTitle")
      const mainTitle = noteMainLayout.querySelector("#title")
      const currentSidebar = sidebarLayout.querySelector(`#id-${data![0]._id}`)
      const sidebarTitle = currentSidebar?.querySelector("#title")
      overlayHeaderTitle?.addEventListener("click", (e: Event): void => {
        e.stopPropagation();
        (e.target as HTMLInputElement).value = data![0].title;
      })
      overlayHeaderTitle?.addEventListener("input", (e: Event): void => {
        (headerTitle as HTMLElement).innerText = (e.target as HTMLInputElement).value;
        (mainTitle as HTMLElement).innerText = (e.target as HTMLInputElement).value;
        (sidebarTitle as HTMLElement).innerText = (e.target as HTMLInputElement).value;
      })
      overlayHeaderTitle?.addEventListener("blur", (e: Event): void => {
        e.preventDefault();
        const newTitle = (overlayHeaderTitle as HTMLInputElement).value;
        dataProxy.updateData = { row: data![0].row, id: data![0]._id, selector: "title", value: newTitle }
      })

      appendOverlay?.appendChild(overlayHeaderTitleLayout)
      overlay?.appendChild(overlayLayout)
    })

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
    document.addEventListener("mouseup", (): void => {
      document.removeEventListener("mousemove", resize, false)
    }, false)
  }
  const resize = (e: MouseEvent): void => {
    let size = SIDEBAR_DEFAULT_WIDTH
    if ((e as MouseEvent).x < SIDEBAR_DEFAULT_WIDTH || (e as MouseEvent).x > SIDEBAR_MAX_WIDTH) {
      if ((e as MouseEvent).x < SIDEBAR_DEFAULT_WIDTH) size = SIDEBAR_DEFAULT_WIDTH
      if ((e as MouseEvent).x > SIDEBAR_MAX_WIDTH) size = SIDEBAR_MAX_WIDTH
    } else {
      size = (e as MouseEvent).x
    }
    setSidebarWidth(size)
  }

  hideSidebarBtn?.addEventListener("click", (e: Event): void => {
    e.stopPropagation()
    e.preventDefault()
    setSidebarWidth(SIDEBAR_MIN_WIDTH);
    (showSidebarIcon as HTMLElement).classList.remove("hidden");
  })
  showSidebarBtn?.addEventListener("click", (e: Event): void => {
    e.stopPropagation()
    e.preventDefault()
    setSidebarWidth(SIDEBAR_DEFAULT_WIDTH);
    (showSidebarIcon as HTMLElement).classList.add("hidden");
  })

  const resizeHover = sidebarLayout.querySelector("#resizeHover")
  sidebarResize?.addEventListener("mousedown", handleResize)
  sidebarResize?.addEventListener("mouseover", (e: Event) => {
    sidebarEl!.style.boxShadow = "rgba(0,0,0,0.1) -2px 0px 0px 0px inset";
    (resizeHover as HTMLElement)!.style.boxShadow = "rgba(0,0,0,0.1) -2px 0px 0px 0px inset";
  })
  sidebarResize?.addEventListener("mouseout", (e: Event) => {
    sidebarEl!.style.boxShadow = "rgba(0,0,0,0.024) -1px 0px 0px 0px inset";
    (resizeHover as HTMLElement)!.style.boxShadow = "rgba(0,0,0,0.024) -1px 0px 0px 0px inset";
  })

  //sidebar width end



  return documentLayout.element
}

export default handleDocumentLayout

