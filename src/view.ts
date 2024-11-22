
import dataProxy from "./pages/document/handleStorageData.js"

interface Note {
  id: string
  icon: string
  title: string
  parentId: string | number
  level: number
  cover: string
}
interface Params {
  id: string
}

const views = {
  Home: async (): Promise<HTMLElement | SVGElement> => {
    const { default: handleHomeLayout } = await import("./pages/home/handleHomeLayout.js")
    const homeLayout = handleHomeLayout()
    return homeLayout
  },
  NotFound: async (): Promise<HTMLElement | SVGElement> => {
    const { default: handleNotFoundLayout } = await import("./pages/notFound/handleNotFoundLayout.js")
    const notFoundLayout = handleNotFoundLayout()
    return notFoundLayout
  },
  Document: async (params?: Params): Promise<HTMLElement | SVGElement> => {
    const { default: handleDocumentLayout } = await import("./pages/document/handleDocumentLayout.js")
    const documentLayout = await handleDocumentLayout()

    if (params?.id) {
      const { default: handleHeaderLayout } = await import("./pages/document/header/handleHeaderLayout.js")
      const datas = dataProxy.noteList
      const currentData = datas?.filter((data: Note): boolean => data.id === params.id)
      const headerLayout = await handleHeaderLayout(currentData[0])
      const header = documentLayout.querySelector("#header")
      header?.replaceChildren(headerLayout)
    }




    return documentLayout
  }
}

export default views


