
import elementCreator from "../../../../../static/creator.js"

const handleItemGroupLayout = async (favorite?: string): Promise<HTMLElement | SVGElement> => {

  const { default: handleItemLayout } = await import("./item/handleItemLayout.js")
  const { default: itemLayoutEl } = await import("./itemLayout.js")

  const itemBody = handleItemLayout()
  const { itemLayout } = elementCreator(itemLayoutEl(favorite))
  const menuTree = itemLayout.element.querySelector("#menuTree")

  menuTree?.replaceChildren(itemBody)

  return itemLayout.element
}

export default handleItemGroupLayout

