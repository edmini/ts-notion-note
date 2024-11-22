
import elementCreator from "../../../static/creator.js"

interface Note {
  id: string
  icon: string
  title: string
  parentId: string | number
  level: number
  cover: string
}


const handleHeaderLayout = async (data: Note): Promise<HTMLElement | SVGElement> => {
  const { default: headerLayoutEl } = await import("./headerLayout.js")
  const { headerLayout } = elementCreator(headerLayoutEl(data))
  return headerLayout.element
}

export default handleHeaderLayout

