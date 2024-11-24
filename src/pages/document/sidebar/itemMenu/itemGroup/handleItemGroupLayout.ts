
import elementCreator from "../../../../../static/creator.js"

const handleItemGroupLayout = async (): Promise<HTMLElement | SVGElement> => {

  const { default: handleItemLayout } = await import("./item/handleItemLayout.js")

  const { default: favoriteItemLayoutEl } = await import("./favoriteItemLayout.js")
  const { default: personalItemLayoutEl } = await import("./personalItemLayout.js")

  const { favoriteItemLayout } = elementCreator(favoriteItemLayoutEl())
  const { personalItemLayout } = elementCreator(personalItemLayoutEl())
  const favMenuTree = favoriteItemLayout.element.querySelector("#menuTree")
  const perMenuTree = personalItemLayout.element.querySelector("#menuTree")

  const favItemBody = handleItemLayout("favorite")
  const perItemBody = handleItemLayout()

  favMenuTree?.appendChild(favItemBody)
  perMenuTree?.appendChild(perItemBody)

  favoriteItemLayout.element.appendChild(personalItemLayout.element)
  favoriteItemLayout.element.children[0].classList.add("hidden")

  return favoriteItemLayout.element
}

export default handleItemGroupLayout

