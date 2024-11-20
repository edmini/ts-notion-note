
import elementCreator from "../../../../static/creator.js"

const handleProfileLayout = async (): Promise<HTMLElement | SVGElement> => {
  const { default: profileLayoutEl } = await import("./profileLayout.js")
  const { profileLayout } = elementCreator(profileLayoutEl())

  return profileLayout.element
}

export default handleProfileLayout
