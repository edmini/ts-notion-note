
import elementCreator from "../../../static/creator.js"

interface Note {
  _id: string
  icon: string
  title: string
  parentId: string | number
  level: number
  coverImage: string
  isFavorited: boolean
  isArchived: boolean
  isPublished: boolean
  content: string
  userId: string
  createdAt: Date
  row: number

}

const handleHeaderLayout = async (data: Note): Promise<HTMLElement | SVGElement> => {

  const { default: headerLayoutEl } = await import("./headerLayout.js")

  const { headerLayout } = elementCreator(headerLayoutEl())

  const headerTitleEl = headerLayout.element.querySelector("#headerTitleEl")
  const headerMoreEl = headerLayout.element.querySelector("#headerMoreEl")

  if (data) {
    const { default: noteTitleLayoutEl } = await import("./noteTitleLayout.js")
    const { default: noteMoreLayoutEl } = await import("./noteMoreLayout.js")
    const { noteTitleLayout } = elementCreator(noteTitleLayoutEl(data))
    const { noteMoreLayout } = elementCreator(noteMoreLayoutEl(data))

    headerTitleEl?.appendChild(noteTitleLayout.element)
    headerMoreEl?.appendChild(noteMoreLayout.element)
  } else {
    const { default: homeMoreLayoutEl } = await import("./homeMoreLayout.js")
    const { homeMoreLayout } = elementCreator(homeMoreLayoutEl())
    headerMoreEl?.appendChild(homeMoreLayout.element)
  }

  return headerLayout.element
}

export default handleHeaderLayout

