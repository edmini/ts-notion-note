
import elementCreator from "../../../../static/creator.js"

const handleOverlayHeaderTitleLayout = async (data: any): Promise<HTMLElement | SVGElement> => {

  const { default: overlayHeaderTitleLayoutEl } = await import("./overlayHeaderTitleLayout.js")
  const { overlayHeaderTitleLayout } = elementCreator(overlayHeaderTitleLayoutEl(data))

  return overlayHeaderTitleLayout.element
}

export default handleOverlayHeaderTitleLayout

