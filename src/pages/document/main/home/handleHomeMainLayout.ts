
import elementCreator from "../../../../static/creator.js"



const handleHomeMainLayout = async (): Promise<HTMLElement | SVGElement> => {
  const { default: homeMainLayoutEl } = await import("./homeMainLayout.js")
  const { homeMainLayout } = elementCreator(homeMainLayoutEl())

  const { default: handleSectionLayout } = await import("./section/handleSectionLayout.js")

  const layoutHome = homeMainLayout.element.querySelector("#layoutHome")

  const sectionLayout = await handleSectionLayout()
  layoutHome?.append(sectionLayout)



  return homeMainLayout.element
}

export default handleHomeMainLayout
