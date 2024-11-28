import dataProxy from "./pages/document/handleStorageData.js"

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
    const res = await fetch("/api")
    const result = await res.json()
    dataProxy.noteList = result

    // if (!params?.id) {
    //   const res = await fetch("/api")
    //   const result = await res.json()
    //   dataProxy.noteList = result
    // } else {
    //   const prevData = dataProxy.noteList
    //   console.log(prevData)
    //   if (prevData?.length! > 0) {
    //     dataProxy.noteList = prevData
    //   } else {
    //     const res = await fetch("/api")
    //     const result = await res.json()
    //     dataProxy.noteList = result
    //   }
    // }

    const { default: handleDocumentLayout } = await import("./pages/document/handleDocumentLayout.js")
    const documentLayout = await handleDocumentLayout(params?.id)
    return documentLayout
  },
  Preview: async (params: Params): Promise<HTMLElement | SVGElement> => {
    console.log(params)
    const { default: handleNotFoundLayout } = await import("./pages/notFound/handleNotFoundLayout.js")
    const notFoundLayout = handleNotFoundLayout()
    return notFoundLayout
  }
}

export default views


