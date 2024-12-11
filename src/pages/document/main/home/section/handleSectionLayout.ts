import elementCreator from "../../../../../static/creator.js"

const handleSectionLayout = async (): Promise<HTMLElement | SVGElement> => {

  const { default: sectionLayoutEl } = await import("./sectionLayout.js")

  const { sectionLayout } = elementCreator(sectionLayoutEl())

  return sectionLayout.element
}

export default handleSectionLayout
