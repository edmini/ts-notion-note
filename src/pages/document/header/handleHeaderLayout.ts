
import elementCreator from "../../../static/creator.js"
import dataProxy from "../handleStorageData.js"

interface Note {
  id: string
  icon: string
  title: string
  parentId: string | number
  level: number
  cover: string
  isFavorited: boolean
  isArchived: boolean
  isPublished: boolean
}

const handleHeaderLayout = async (id?: string): Promise<HTMLElement | SVGElement> => {

  const { default: headerLayoutEl } = await import("./headerLayout.js")

  const datas = dataProxy.noteList
  const data: Note[] | undefined = datas?.filter((data: Note): boolean => data.id === id)

  const { headerLayout } = elementCreator(headerLayoutEl(data![0]))
  return headerLayout.element
}

export default handleHeaderLayout

