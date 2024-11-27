
import elementCreator from "../../../static/creator.js"

const handleOverlayLayout = async (data: any): Promise<HTMLElement | SVGElement> => {

  const { default: overlayLayoutEl } = await import("./overlayLayout.js")
  const { overlayLayout } = elementCreator(overlayLayoutEl(data))

  const overlayLayoutRemove = overlayLayout.element.querySelector("#overlayLayoutRemove")
  overlayLayoutRemove?.addEventListener("click", (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
    overlayLayout.element.remove()
  })


  return overlayLayout.element
}

export default handleOverlayLayout
