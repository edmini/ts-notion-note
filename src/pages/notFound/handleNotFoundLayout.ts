
import elementCreator from "../../static/creator.js"

const handleNotFoundLayout = async () => {
  const { default: notFoundLayoutEl } = await import("./notFoundLayout.js")
  const { notFoundLayout } = elementCreator(notFoundLayoutEl())

  return notFoundLayout.element
}

export default handleNotFoundLayout

