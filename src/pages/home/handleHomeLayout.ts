
import elementCreator from "../../static/creator.js"

const handleHomeLayout = async (): Promise<HTMLElement | SVGElement> => {
  const { default: homeLayoutEl } = await import("./homeLayout.js")
  const { homeLayout } = elementCreator(homeLayoutEl())

  return homeLayout.element
}

export default handleHomeLayout
